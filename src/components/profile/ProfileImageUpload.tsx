"use client"

import React, {useRef, useState} from 'react';
import {Camera, Loader2} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getClientFileUrl} from "@/lib/api-client";
import {useAuth} from '@/components/provider/AuthProvider';
import {FileService} from '@/service/file-service';
import {useUpdateProfileImage} from '@/hooks/query/user/use-update-profile-image';
import {toast} from 'sonner';

export function ProfileImageUpload() {
    const {user} = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const {updateProfileImage, isPending} = useUpdateProfileImage();

    if (!user) return null;

    const initials = `${user.name[0]}${user.surname[0]}`.toUpperCase();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('გთხოვთ აირჩიოთ სურათი');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს');
            return;
        }

        try {
            setUploading(true);
            const response = await FileService.uploadPublicFile(file);
            await updateProfileImage({profileImageId: response.id});
        } catch (error) {
            toast.error('ფოტოს ატვირთვა ვერ მოხერხდა');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const isLoading = uploading || isPending;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary">
                    <AvatarImage
                        src={getClientFileUrl(user.profileImageId)}
                        alt="Profile"
                        className="object-cover"
                    />
                    <AvatarFallback className="text-2xl sm:text-3xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin"/>
                    ) : (
                        <Camera className="w-5 h-5"/>
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
                <p className="text-lg sm:text-xl font-semibold">
                    {user.name} {user.surname}
                </p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
        </div>
    );
}