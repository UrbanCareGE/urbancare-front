import {z} from "zod";

export const registerSchema = z
    .object({
        firstName: z.string()
            .min(2, {message: "სახელი უნდა შედგებოდეს მინიმუმ 2 ასოსგან"}),
        lastName: z.string()
            .min(2, {message: "გვარი უნდა შედგებოდეს მინიმუმ 2 ასოსგან"}),
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
        confirmPassword: z.string().min(6, {message: "გამეორებული პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"}),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "გთხოვთ დაეთანხმოთ წესებსა და პირობებს",
        }),
        otp: z.string()
            .refine((val) => !!val, {
                message: "კოდი არავალიდურია, სცადეთ თავიდან",
            })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "გთხოვთ, დარწმუნდეთ, რომ პაროლები ერთმანეთს ემთხვევა.",
        path: ["confirmPassword"],
    });