import { privateUserSchema, type PrivateUserValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const Private = () => {
  const form = useForm<PrivateUserValues>({
    resolver: zodResolver(privateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      surname: "",
      phoneNumber: "",
      email: "",
      password: "",
      newPassword: "",
    },
  });

  async function onSubmit(data: PrivateUserValues) {
    try {
      if (data.password !== data.newPassword) {
        toast.error("Пароли не совпадают");
        return;
      }
      console.log(data);
    } catch (error) {
      // @ts-expect-error - something wrong
      toast.error(error?.response?.data.message || "Login failed");
      console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="uppercase text-xl font-bold">Персональные данные</h1>
      <div className="h-0.5 w-full bg-black" />
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Имя: <span className="text-red-500">*</span>
            </FormLabel>
            <div className="md:flex items-center gap-5 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder=""
                        className="border w-full bg-white border-gray-300 rounded-none h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-[#9E9186]">
                Заполните, чтобы мы знали, как к вам обращаться
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Фамилия: <span className="text-red-500">*</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder=""
                      className="border w-full bg-white border-gray-300 rounded-none h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Отчество: <span className="text-red-500">*</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder=""
                      className="border w-full bg-white border-gray-300 rounded-none h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Телефон: <span className="text-red-500">*</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder=""
                      className="border w-full bg-white border-gray-300 rounded-none h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              E-Mail: <span className="text-red-500">*</span>
            </FormLabel>
            <div className="md:flex items-center gap-5 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder=""
                        className="border w-full bg-white border-gray-300 rounded-none h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-[#9E9186]">
                Для отправки уведомлений о статусе заказа. Используйте как логин
                для входа в личный кабинет
              </p>
            </div>
          </div>

          <h1 className="uppercase text-xl font-bold">Смена пароля</h1>
          <div className="h-0.5 w-full bg-black" />

          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Новый пароль:<span className="text-red-500">*</span>
            </FormLabel>
            <div className="md:flex items-center gap-5 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder=""
                        className="border bg-white border-gray-300 rounded-none h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-[#9E9186]">
                Пароль должен быть не менее 6 символов длиной.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-[#9E9186]">
              Подтверждение нового пароля:
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder=""
                      className="border bg-white border-gray-300 rounded-none h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-5">
            <Button
              variant={"destructive"}
              disabled={form.formState.isSubmitting}
              type="submit"
              className="h-12 uppercase font-bold rounded-none"
            >
              {form.formState.isSubmitting ? (
                <p className="flex items-center">
                  <Loader size={24} className="mr-2 animate-spin" />
                  Loading...
                </p>
              ) : (
                "Сохранить"
              )}
            </Button>
            <Button
              onClick={() => form.reset()}
              variant={"default"}
              type="button"
              className="h-12 uppercase font-bold rounded-none"
            >
              Сбросить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Private;
