import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRole, type IUser } from "@/types";
import Modal from "../modal/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/http/axios";
import { toast } from "sonner";

interface EditUserFormProps {
  setIsEditModalOpen: (isOpen: boolean) => void;
  defaultValues: IUser;
  onSuccess: (updateUser: IUser) => void;
}

const EditUserForm = ({
  setIsEditModalOpen,
  defaultValues,
  onSuccess,
}: EditUserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: defaultValues.email,
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      phoneNumber: defaultValues.phoneNumber || "",
      surname: defaultValues.surname || "",
      role: defaultValues.role,
    },
  });

  const onSubmit = async (data: IUser) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast("Токен аутентификации не найден. Пожалуйста, войдите снова.");
        return;
      }

      const updateData: Partial<IUser> = {
        email: data.email,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        surname: data.surname || null,
        role: data.role,
      };

      const res = await api.put(`/users/${defaultValues.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Пользователь обновлен успешно");

      onSuccess(res.data.content);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Не удалось обновить пользователя. Попробуйте еще раз");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setIsEditModalOpen(false)}
      title="Редактировать пользователя"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Эл. почта *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Эл. почта обязательна",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат эл. почты",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Роль *</Label>
            <Select
              value={watch("role") as UserRole}
              onValueChange={(value: string) =>
                setValue("role", value as UserRole)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                <SelectItem value={UserRole.CUSTOMER}>
                  {UserRole.CUSTOMER}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Имя</Label>
            <Input id="firstName" {...register("firstName")} />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Фамилия</Label>
            <Input id="lastName" {...register("lastName")} />
          </div>

          {/* Surname */}
          <div className="space-y-2">
            <Label htmlFor="surname">Отчество</Label>
            <Input id="surname" {...register("surname")} />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Телефон</Label>
            <Input id="phoneNumber" type="tel" {...register("phoneNumber")} />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsEditModalOpen(false)}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button type="submit" variant={"secondary"} disabled={isLoading}>
            {isLoading ? "Обновление..." : "Обновить пользователя"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserForm;
