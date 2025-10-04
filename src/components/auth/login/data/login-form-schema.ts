import {z} from "zod";

const LoginFormSchema = z
    .object({
        emailOrPhone: z
            .string()
            .refine(
                (val) =>
                    /^[a-zA-Z0-9._%+-]{3,32}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ||
                    /^\+?[1-9]\d{7,14}$/.test(val),
                {
                    message: "გთხოვთ შეიყვანოთ ელ-ფოსტა ან ტელეფონი",
                }
            ),
        password: z.string().min(6, {message: "პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან."}),
    })
    .refine((data) => true, {
        message: "გთხოვთ, დარწმუნდეთ, რომ პაროლები ერთმანეთს ემთხვევა.",
        path: ["confirmPassword"],
    });

export default LoginFormSchema;