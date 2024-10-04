import { z } from "zod";

const testCreateUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address" }),

  password: z.string().min(1, { message: "Password is requried." }),
});

type TestCreateUserSchema = z.infer<typeof testCreateUserSchema>


const testCreateUserSchemaDefaultValues: TestCreateUserSchema = {
  email: "",
  password: "",
};

export { testCreateUserSchema, type TestCreateUserSchema, testCreateUserSchemaDefaultValues }