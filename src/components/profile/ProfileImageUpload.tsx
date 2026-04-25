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
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-primary-container/45 via-primary-container/10 to-transparent" />

        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-urbancare-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/4 -left-20 w-56 h-56 rounded-urbancare-full bg-primary-container/45 blur-3xl" />
        <div className="absolute -bottom-12 right-1/4 w-48 h-48 rounded-urbancare-full bg-tertiary/15 blur-3xl" />

        <svg
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          <circle
            cx="60"
            cy="220"
            r="55"
            fill="rgb(var(--color-primary) / 0.06)"
          />
          <circle
            cx="60"
            cy="220"
            r="32"
            fill="rgb(var(--color-primary) / 0.08)"
          />

          <path
            d="M -20 70 Q 100 30 220 60 T 420 50"
            stroke="rgb(var(--color-primary) / 0.18)"
            strokeWidth="1.4"
          />
          <path
            d="M -20 250 Q 100 220 220 245 T 420 235"
            stroke="rgb(var(--color-primary) / 0.15)"
            strokeWidth="1.4"
          />

          <g
            stroke="rgb(var(--color-primary) / 0.20)"
            fill="none"
            strokeWidth="1"
          >
            <circle cx="350" cy="240" r="34" />
            <circle cx="350" cy="240" r="48" strokeDasharray="2 4" />
          </g>

          <g fill="rgb(var(--color-primary) / 0.30)">
            <circle cx="60" cy="40" r="1.8" />
            <circle cx="130" cy="65" r="1.3" />
            <circle cx="220" cy="35" r="1.5" />
            <circle cx="320" cy="55" r="1.8" />
            <circle cx="380" cy="100" r="1.4" />
            <circle cx="40" cy="120" r="1.3" />
            <circle cx="170" cy="280" r="1.6" />
            <circle cx="280" cy="270" r="1.5" />
            <circle cx="200" cy="100" r="1.2" />
          </g>

          <g
            stroke="rgb(var(--color-primary) / 0.32)"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <line x1="100" y1="40" x2="106" y2="40" />
            <line x1="103" y1="37" x2="103" y2="43" />

            <line x1="350" y1="120" x2="356" y2="120" />
            <line x1="353" y1="117" x2="353" y2="123" />

            <line x1="80" y1="270" x2="86" y2="270" />
            <line x1="83" y1="267" x2="83" y2="273" />
          </g>
        </svg>
      </div>

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
