import { z } from "zod";
import { signInSchema } from "../services/validation";

export type IForm = {
    username: z.ZodString;
    password: z.ZodString;
};

export type ISignInInput = z.infer<typeof signInSchema>;
