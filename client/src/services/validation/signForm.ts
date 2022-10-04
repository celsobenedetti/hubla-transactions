import { z, ZodSchema } from "zod";
import { ISignInInput } from "../../interfaces";
import { formatErroMessage, validateSchema } from "./validateSchema";

export const signInSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        })
        .min(3, { message: "Username must be at least 3 characters long" }),

    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
        .min(5, { message: "Password must be at least 5 characters long" }),
});

export const validateSignForm = (schema: ZodSchema, input: ISignInInput) => {
    const errors = validateSchema(schema, input);
    if (errors) return formatErroMessage(errors);
    return "";
};
