import {z} from "zod";

export const createThreadSchema = z
    .object({
        // tags: z.array(z.string()).max(3, {message: "3-ზე მეტი კატეგორია ვერ იქნება მონიშნული"}),
        title: z.string()
            .min(1, {message: "სათაური უნდა შედგებოდეს მინიმუმ 1 სიმბოლოსაგან"})
            .max(100, {message: "სათაური არ უნდა აღემატებოდეს 100 სიმბოლოს"}),
        body: z.string()
            .min(2, {message: "გვარი უნდა შედგებოდეს მინიმუმ 2 ასოსგან"}),
    });