import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerFormSchema, type RegisterFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import generateCaptcha from "@/lib/generatecapthca";
import CaptchaCanvas from "@/lib/CaptchaCanvas";
import { Checkbox } from "../ui/checkbox";
import api from "@/http/axios";
import { useAuthStore } from "@/hooks/useAuthStore";

const RegisterModal = ({
  open,
  onOpenChange,
  setOpenLogin,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  setOpenLogin: (val: boolean) => void;
}) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      captcha: "",
      privaceAgreement: false,
    },
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const { checkAuth } = useAuthStore();

  async function onSubmit(data: RegisterFormValues) {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Пароли не совпадают");
        return;
      }

      if (data.captcha !== captcha) {
        toast.error("Капча неверна");
        setCaptcha(generateCaptcha());
        return;
      }

      const res = await api.post("/auth/register", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Вход успешен");
      form.reset();
      onOpenChange(false);
      await checkAuth();
    } catch (error) {
      console.error("Error during registration:", error);
      // @ts-expect-error - samething wrong
      toast.error(error?.response?.data.message || "Ошибка регистрации");
    }
  }

  function handleLogin() {
    onOpenChange(false);
    setOpenLogin(true);
  }

  if (!open) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-w-[95%] p-0 bg-gray border-none">
        <div className="relative w-full">
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 p-0 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="p-6">
            <h1 className="uppercase sm:text-2xl text-lg font-bold sm:mb-4 mb-2">
              Создать аккаунт
            </h1>
            <p className="text-sm font-normal mb-6">
              Ваша учетная запись позволяет отслеживать ваши заказы, управлять
              подписками, а также получать доступ к эксклюзивным предложениям
            </p>

            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          className="border border-gray-300 rounded-none h-12"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Пароль"
                            className="border border-gray-300 rounded-none h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Подтвердите пароль"
                            className="border border-gray-300 rounded-none h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <CaptchaCanvas value={captcha} />
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Введите капчу"
                            className="border border-gray-300 rounded-none h-12"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full bg-[#231F1E] hover:bg-[#3A3332] text-white h-12 rounded-none"
                >
                  {form.formState.isSubmitting ? (
                    <p className="flex items-center">
                      <Loader size={24} className="mr-2 animate-spin" />
                      Loading...
                    </p>
                  ) : (
                    "Регистрация"
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-100 focus:ring-gray-300 hover:bg-gray-50 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none ">
                          <FormLabel className="text-sm font-normal">
                            Подпишитесь на рассылку, чтобы первыми узнавать о
                            распродажах, событиях и новых поступлениях.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="privaceAgreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-100 focus:ring-gray-300 hover:bg-gray-50 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal text-sm">
                            Нажав Зарегистрироваться, вы соглашаетесь с
                            политикой конфиденциальности. и условиями
                            использования
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>

            <div className="mt-4 text-sm">
              Уже есть аккаунт{" "}
              <Button
                onClick={() => handleLogin()}
                variant="link"
                className="px-1 font-bold text-[#231F1E]"
              >
                ВОЙТИ В СИСТЕМУ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
