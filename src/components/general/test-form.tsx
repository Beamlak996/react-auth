import {
  TestCreateUserSchema,
  testCreateUserSchema,
  testCreateUserSchemaDefaultValues,
} from "@/types/test-create-user-schema";
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
import { PasswordInput } from "@/components/general/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "@/modules/auth/services/auth-queries";


export const TestForm = () => {
const { mutateAsync, isPending } = useCreateUserMutation();

    const form = useForm<TestCreateUserSchema>({
      resolver: zodResolver(testCreateUserSchema),
      defaultValues: testCreateUserSchemaDefaultValues,
    });

    const onSubmit = async (values: TestCreateUserSchema) => {
      try {
        await mutateAsync(values);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[50%] ml-10"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Continue"}
          </Button>
        </form>
      </Form>
    );
}