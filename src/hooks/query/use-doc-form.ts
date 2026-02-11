import { z } from 'zod';

const addDocSchema = z
  .object({
    title: z.string().min(2, 'სათაური უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს'),
    type: z.enum(['TEXT', 'PDF']),
    fileIds: z.array(z.string()),
    text: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'TEXT') {
        return data.text && data.text.trim().length >= 10;
      }
      return true;
    },
    {
      message: 'ტექსტი უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს',
      path: ['text'],
    }
  )
  .refine(
    (data) => {
      if (data.type === 'PDF') {
        return data.fileIds.length > 0;
      }
      return true;
    },
    {
      message: 'გთხოვთ ატვირთოთ მინიმუმ ერთი ფაილი',
      path: ['fileIds'],
    }
  );

type AddDocFormValues = z.infer<typeof addDocSchema>;

export { addDocSchema, type AddDocFormValues };
