import { z } from 'zod';

export const TagsFilterSchema = z.object({
  tags: z
    .array(z.string())
    .max(3, { message: 'მაქსიმუმ სამი თეგის მონიშვნაა შესაძლებელი' }),
});
