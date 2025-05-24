import { subscribeShema, type SubscribeValues } from "@/lib/validation";
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
import { Checkbox } from "@/components/ui/checkbox";

const Subscribe = () => {
  const form = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeShema),
    defaultValues: {
      email: "",
      agree: false,
    },
  });

  async function onSubmit(data: SubscribeValues) {
    try {
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
              Ваш e-mail: <span className="text-red-500">*</span>
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
                После добавления или изменения адреса подписки вам будет выслан
                код подтверждения. Подписка будет не активной до ввода кода
                подтверждения.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="agree"
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
                    <FormLabel className="font-normal">
                      Я согласен на обработку персональных данных
                    </FormLabel>
                  </div>
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
                "Добавить"
              )}
            </Button>
            <Button
              onClick={() => form.reset()}
              variant={"default"}
              type="button"
              className="h-12 uppercase font-bold rounded-none"
            >
              Сброс
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Subscribe;
