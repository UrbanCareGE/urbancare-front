import {z} from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];

const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `ფაილის ზომა არ უნდა აღემატებოდეს ${MAX_FILE_SIZE / 1024 / 1024}MB-ს`,
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: "მხარდაჭერილია მხოლოდ სურათები და ვიდეოები",
    });

export const createThreadSchema = z
    .object({
        title: z.string()
            .min(0, {message: "სათაური უნდა შედგებოდეს მინიმუმ 1 სიმბოლოსაგან"})
            .max(100, {message: "სათაური არ უნდა აღემატებოდეს 100 სიმბოლოს"}),
        body: z.string()
            .min(0, {message: "კონტენტი უნდა შედგებოდეს მინიმუმ 0 ასოსგან"})
            .max(2000, {message: "კონტენტი უნდა შედგებოდეს mაქსიმუმ 2000 ასოსგან"}),
        files: z
            .array(fileSchema)
            .max(MAX_FILES, `მაქსიმუმ ${MAX_FILES} ფაილის ატვირთვა შეგიძლიათ`)
            .optional(),
        tags: z
            .array(z.string())
            .max(3, {message: "მაქსიმუმ 3 თეგის მითითებაა შესაძლებელი"})
            .default([])
            .optional(),
        pollOptions: z
            .array(z.string())
            .default([])
            .optional()
    });