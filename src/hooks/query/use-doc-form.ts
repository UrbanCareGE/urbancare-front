import { z } from 'zod';
import { useTranslation } from '@/i18n';

function useDocFormSchema() {
  const t = useTranslation();

  const addDocSchema = z
    .object({
      title: z.string().min(2, t.docForm.titleMinLength),
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
        message: t.docForm.textMinLength,
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
        message: t.docForm.uploadAtLeastOneFile,
        path: ['fileIds'],
      }
    );

  return addDocSchema;
}

type AddDocFormValues = z.infer<ReturnType<typeof useDocFormSchema>>;

export { useDocFormSchema, type AddDocFormValues };
