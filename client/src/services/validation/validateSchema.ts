import { ZodError, ZodSchema } from "zod";
export const validateSchema = (schema: ZodSchema, data: any) => {
    try {
        schema.parse(data);
    } catch (err: ZodError | unknown) {
        if (err instanceof ZodError) {
            return err.issues.map((issue) => issue.message);
        }
    }
};

export const formatErroMessage = (errors: string[]) => {
    return errors.reduce((message, error) => message + error + "\n", "");
};
