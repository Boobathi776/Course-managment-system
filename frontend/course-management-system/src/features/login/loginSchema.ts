import z from "zod";

export const loginSchema = z.object({
    email : z.string().email("Enter a valid email").max(200,"Enter a valid email"),
    password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*&()])[a-zA-Z0-9!@#$%^&*()]{8,150}$/,
        {message:"password should contain 1 Captial,1 small letter and 1 number and 1 special letter and minimum 8 letters for strong password"})
});

export type LoginFormType = z.infer<typeof loginSchema>;
