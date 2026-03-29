'use client';

import React, { useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { useAuth } from '@/components/provider/AuthProvider';
import { useUpdateProfileImage } from '@/hooks/query/user/use-update-profile-image';
import { toast } from 'sonner';
import Image from 'next/image';
import { useUploadFile } from '@/hooks/query/file/use-upload-file';
import { useTranslation } from '@/i18n';

export function ProfileImageUpload() {
  const t = useTranslation();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFileImageMutation, isPending: isUploading } =
    useUploadFile();
  const { mutateAsync: updateProfileImageMutation, isPending: isUpdating } =
    useUpdateProfileImage();
  const initials = `${user.name?.[0]}${user.surname?.[0]}`.toUpperCase();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t.profile.selectImage);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t.profile.fileSizeMax5MB);
      return;
    }

    try {
      const uploadedFile = await uploadFileImageMutation({ file });
      await updateProfileImageMutation({ profileImageId: uploadedFile.id });
    } catch (error) {
      toast.error(t.profile.photoUploadFailed);
      console.error('Upload error:', error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isLoading = isUploading || isUpdating;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 rounded-urbancare-full bg-primary ring ring-4 ring-foreground-secondary">
          <Image
            src={getClientFileUrl(user.profileImageId)}
            alt="Profile"
            fill
            className="object-cover"
          />
          <AvatarFallback className="text-urbancare-5xl sm:text-urbancare-7xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="absolute bottom-0 right-0 p-2 bg-primary rounded-urbancare-full text-white shadow-lg lg:hover:bg-primary/80 lg:hover:scale-110 lg:active:scale-95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Camera className="w-5 h-5" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isLoading}
        />
      </div>
      <div className="text-center">
        <p className="text-urbancare-2xl sm:text-urbancare-3xl font-semibold">
          {user.name} {user.surname}
        </p>
        <p className="text-urbancare-base text-muted-foreground">
          {user.phone.number}
        </p>
      </div>
    </div>
  );
}
