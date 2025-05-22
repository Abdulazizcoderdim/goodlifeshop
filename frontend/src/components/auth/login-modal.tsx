import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginFormSchema, type LoginFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const LoginModal = ({
  open,
  onOpenChange,
  setOpenRegister,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  setOpenRegister: (val: boolean) => void;
}) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    toast.success("Login successful");
    onOpenChange(false);
  }

  function handleRegister() {
    setOpenRegister(true);
    onOpenChange(false);
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
              Добро пожаловать
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
                  <FormLabel className="text-sm font-medium">Пароль:</FormLabel>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••••••••"
                            className="border border-gray-300 rounded-none h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#231F1E] hover:bg-[#3A3332] text-white h-12 rounded-none"
                >
                  ВОЙТИ
                </Button>

                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-100 focus:ring-gray-300 hover:bg-gray-50 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Запомнить</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>

            <div className="mt-4 space-y-2">
              <Button variant="link" className="px-0 text-[#231F1E] font-bold">
                ЗАБЫЛИ ПАРОЛЬ?
              </Button>
              <div className="text-sm">
                Не зарегистрированы?{" "}
                <Button
                  onClick={handleRegister}
                  variant="link"
                  className="px-1 font-bold text-[#231F1E]"
                >
                  СОЗДАТЬ АККАУНТ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
