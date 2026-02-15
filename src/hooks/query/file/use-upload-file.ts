import { useMutation } from '@tanstack/react-query';
import { FileService } from '@/service/file-service';

export function useUploadFile() {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      return FileService.uploadPublicFile(file);
    },
  });
}
