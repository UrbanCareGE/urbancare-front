'use client';

import React, { useRef } from 'react';
import { Camera, Loader2, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { useAuth } from '@/components/provider/AuthProvider';
import { useUpdateProfileImage } from '@/hooks/query/user/use-update-profile-image';
import { toast } from 'sonner';
import Image from 'next/image';
import { useUploadFile } from '@/hooks/query/file/use-upload-file';
import { useTranslation } from '@/i18n';
import { ExtractUserInitials } from '@/lib/utils';

export function ProfileImageUpload() {
  const t = useTranslation();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFileImageMutation, isPending: isUploading } =
    useUploadFile();
  const { mutateAsync: updateProfileImageMutation, isPending: isUpdating } =
    useUpdateProfileImage();
  const initials = ExtractUserInitials(user);

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
    <section className="relative overflow-hidden rounded-urbancare-3xl border-none bg-surface shadow-sm shadow-shadow/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary-container/60 via-primary-container/20 to-transparent"
      />

      <div className="relative flex flex-col items-center gap-4 px-6 py-8">
        <div className="relative">
          <Avatar className="w-28 h-28 sm:w-32 sm:h-32 rounded-urbancare-full bg-primary ring-4 ring-surface shadow-xl shadow-primary/20">
            <Image
              src={getClientFileUrl(user.profileImageId)}
              alt="Profile"
              fill
              className="object-cover"
            />
            <AvatarFallback className="text-urbancare-5xl sm:text-urbancare-7xl text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            aria-label="Change photo"
            className="absolute bottom-1 right-1 p-2.5 bg-primary text-primary-foreground rounded-urbancare-full shadow-lg shadow-primary/30 ring-4 ring-surface lg:hover:bg-primary-hover lg:hover:scale-110 lg:active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="text-center space-y-1.5">
          <p className="text-urbancare-3xl sm:text-urbancare-4xl font-semibold leading-tight-georgian text-text-primary">
            {user.name} {user.surname}
          </p>
          <div className="inline-flex items-center gap-1.5 text-urbancare-base text-text-secondary">
            <Phone className="w-4 h-4" />
            <span>{user.phone.number}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
