import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" }) 
    .email({ message: "Please provide a valid email address" }), 

  password: z.string().min(1, { message: "Password is requried." }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const loginSchemaDefaultValues: LoginSchema = {
  email: "",
  password: "",
};

export { loginSchema, type LoginSchema, loginSchemaDefaultValues };
