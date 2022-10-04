import { signInSchema, validateSignForm } from "../signForm";
import { validateSchema } from "../validateSchema";

describe("validateSchema service tests", () => {
    it("should return errors if schema is invalid", () => {
        const user = { username: "myMockUsername", password: "1" };
        const errors = validateSchema(signInSchema, user);
        expect(errors).toBeInstanceOf(Array);
    });

    it("should pass if schema is valid", () => {
        const user = { username: "myMockUsername", password: "123456" };
        const errors = validateSchema(signInSchema, user);
        expect(errors).toBeUndefined();
    });
});

describe("validateSignForm", () => {
    it("should return errors if schema is invalid", () => {
        const user = { username: "myMockUsername", password: "1" };
        const errors = validateSignForm(signInSchema, user);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("should pass if schema is valid", () => {
        const user = { username: "myMockUsername", password: "123456" };
        const errors = validateSignForm(signInSchema, user);
        expect(errors).toBe("");
    });
});
