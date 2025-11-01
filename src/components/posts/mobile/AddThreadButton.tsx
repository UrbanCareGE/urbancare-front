'use client';

import {Button} from "@/components/ui/button";
import {Image, PlusCircle, Video, X} from "lucide-react";
import React, {useRef, useState} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useAuth} from "@/components/provider/AuthProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
// import { PostService } from "@/service/post-service"; // Your service

export const AddThreadButton = () => {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const categories = [
        {value: "general", label: "ზოგადი", color: "from-green-400 to-emerald-500"},
        {value: "events", label: "ღონისძიებები", color: "from-purple-400 to-pink-500"},
        {value: "ask", label: "კითხვა", color: "from-blue-400 to-cyan-500"},
        {value: "lost_found", label: "დაკარგული/ნაპოვნი", color: "from-amber-400 to-orange-500"},
        {value: "safety", label: "უსაფრთხოება", color: "from-red-400 to-rose-500"},
    ];

    const addPostMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            // return await PostService.create(formData);
            // Temporary mock - replace with your actual service
            return new Promise((resolve) => setTimeout(resolve, 1000));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts_list']});
            handleReset();
            setOpen(false);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const newFiles = [...files, ...selectedFiles].slice(0, 5); // Max 5 files

        setFiles(newFiles);

        // Create preview URLs
        const urls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);

        // Revoke the removed URL to free memory
        URL.revokeObjectURL(previewUrls[index]);

        setFiles(newFiles);
        setPreviewUrls(newUrls);
    };

    const handleReset = () => {
        setTitle("");
        setContent("");
        setCategory("");
        setFiles([]);
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setPreviewUrls([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = () => {
        if (!content.trim() || !category) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('apartmentId', user?.selectedApartment?.id || '');

        files.forEach((file, index) => {
            formData.append(`files`, file);
        });

        addPostMutation.mutate(formData);
    };

    const isFormValid = content.trim() && category;

    return (
        <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
            <DrawerTrigger asChild>
                <Button
                    className="w-auto h-12 bg-primary rounded-panel px-3 transition-all"
                >
                    <p className="font-medium">დამატება</p>
                    <PlusCircle className="w-6 h-6"/>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="bg-white max-h-[90vh]">
                <DrawerHeader className="border-b border-slate-200">
                    <DrawerTitle className="text-xl font-bold text-slate-900">
                        ახალი პოსტის შექმნა
                    </DrawerTitle>
                </DrawerHeader>

                <div className="px-4 py-6 overflow-y-auto space-y-6">
                    {/* Category Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                            კატეგორია *
                        </Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="აირჩიეთ კატეგორია"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.value} value={cat.value}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}/>
                                            {cat.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Title (Optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                            სათაური (არასავალდებულო)
                        </Label>
                        <Input
                            id="title"
                            placeholder="დაამატეთ სათაური..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={addPostMutation.isPending}
                            className="text-base"
                            maxLength={100}
                        />
                        <p className="text-xs text-slate-500 text-right">
                            {title.length}/100
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm font-medium text-slate-700">
                            შინაარსი *
                        </Label>
                        <Textarea
                            id="content"
                            placeholder="რას გააზიარებთ?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={addPostMutation.isPending}
                            className="min-h-[120px] resize-none text-base"
                            maxLength={2000}
                        />
                        <p className="text-xs text-slate-500 text-right">
                            {content.length}/2000
                        </p>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700">
                            ფოტო/ვიდეო (მაქს. 5)
                        </Label>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={files.length >= 5 || addPostMutation.isPending}
                                className="flex-1 gap-2"
                            >
                                <Image className="w-4 h-4"/>
                                ფოტო
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={files.length >= 5 || addPostMutation.isPending}
                                className="flex-1 gap-2"
                            >
                                <Video className="w-4 h-4"/>
                                ვიდეო
                            </Button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* File Previews */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                                {previewUrls.map((url, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-xl overflow-hidden bg-slate-100 aspect-square"
                                    >
                                        {files[index].type.startsWith('image/') ? (
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center bg-slate-200">
                                                <Video className="w-12 h-12 text-slate-400"/>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4"/>
                                        </button>
                                        <div
                                            className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded-md">
                                            {(files[index].size / 1024 / 1024).toFixed(1)} MB
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {addPostMutation.isError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">
                                შეცდომა: {(addPostMutation.error as Error)?.message || 'დაფიქსირდა შეცდომა'}
                            </p>
                        </div>
                    )}
                </div>

                <DrawerFooter className="border-t border-slate-200 pt-4">
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid || addPostMutation.isPending}
                        className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                        {addPostMutation.isPending ? (
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                პოსტის შექმნა...
                            </div>
                        ) : (
                            'გამოქვეყნება'
                        )}
                    </Button>

                    <DrawerClose asChild>
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base"
                            onClick={handleReset}
                        >
                            გაუქმება
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};