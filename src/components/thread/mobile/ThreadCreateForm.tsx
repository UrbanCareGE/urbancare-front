'use client'

import React, {useRef, useState} from "react";
import {CreateThreadButton} from "@/components/thread/mobile/CreateThreadButton";
import ThreadForm from "@/components/thread/mobile/thread-form/ThreadForm";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {DrawerTitle} from "@/components/ui/drawer";
import {FileText, Image as ImageIconLucide, Sparkles, Upload, Video, X} from "lucide-react";
import {useCreateThread} from "@/hooks/query/use-create-thread";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SheetClose, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";

export const ThreadCreateForm = () => {
    const {form, onSubmit, isPending, isError, error} = useCreateThread();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const titleLength = form.watch("title")?.length || 0;
    const bodyLength = form.watch("body")?.length || 0;
    const files = form.watch("files") || [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const currentFiles = form.getValues("files") || [];
        const newFiles = [...currentFiles, ...selectedFiles].slice(0, 5);

        // Update form field
        form.setValue("files", newFiles, {shouldValidate: true});

        // Clean up old preview URLs
        previewUrls.forEach(url => URL.revokeObjectURL(url));

        // Create new preview URLs
        const urls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (index: number) => {
        const currentFiles = form.getValues("files") || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);

        // Revoke the removed URL
        if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
        }

        // Update form field
        form.setValue("files", newFiles, {shouldValidate: true});
        setPreviewUrls(newUrls);
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    return (
        <ThreadForm>
            <ThreadForm.Trigger>
                <CreateThreadButton/>
            </ThreadForm.Trigger>
            <ThreadForm.Sheet>
                {/* Header */}
                <SheetHeader className="border-b border-slate-200 px-3 py-3">
                    <div className="flex items-center gap-2">
                        <div className={"w-8"}></div>
                        <div className={"mr-auto ml-auto"}>
                            <SheetTitle className="text-lg font-semibold text-slate-900">
                                ახალი პოსტი
                            </SheetTitle>
                        </div>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full [&_svg]:size-7">
                                <X/>
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>
                <Form {...form}>
                    <form className="flex flex-col flex-1" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Scrollable Content */}
                        <div className="px-6 py-6 space-y-3">
                            {/* Body Field */}
                            <FormField
                                control={form.control}
                                name="body"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between mb-2">
                                            <FormLabel
                                                className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-slate-400"/>
                                                ტექსტი <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <span className={cn(
                                                "text-xs font-medium transition-colors",
                                                bodyLength > 1900 ? "text-red-600" :
                                                    bodyLength > 1700 ? "text-amber-600" :
                                                        "text-slate-400"
                                            )}>
                                                {bodyLength}/2000
                                            </span>
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                placeholder="რას გააზიარებთ? გაგვიზიარეთ თქვენი აზრები, გამოცდილება ან შეკითხვა..."
                                                disabled={isPending}
                                                className="min-h-40 resize-none text-base border-slate-200 focus:border-primary focus:ring-primary/20 transition-all"
                                                maxLength={2000}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            {/* File Upload Section */}
                            <FormField
                                control={form.control}
                                name="files"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between mb-3">
                                            <FormLabel
                                                className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                <ImageIconLucide className="w-4 h-4 text-slate-400"/>
                                                მედია ფაილები
                                            </FormLabel>
                                            <span className="text-xs text-slate-500">
                                                {files.length}/5 ფაილი
                                            </span>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*,video/*"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />

                                        {/* Upload Area */}
                                        <div className="space-y-3">
                                            {/* Upload Button */}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={files.length >= 5 || isPending}
                                                className="w-full h-auto border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-all group"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                                        <Upload
                                                            className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors"/>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium text-slate-700">
                                                            ფოტოს ან ვიდეოს ატვირთვა
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            მაქს. 5 ფაილი, თითო 10MB-მდე
                                                        </p>
                                                    </div>
                                                </div>
                                            </Button>

                                            {/* File Preview */}
                                            {files.length > 0 && previewUrls.length > 0 && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between px-1">
                                                        <p className="text-xs font-medium text-slate-600">
                                                            ატვირთული ფაილები
                                                        </p>
                                                        {files.length > 3 && (
                                                            <p className="text-xs text-slate-400">
                                                                ← გადაფურცლეთ →
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="relative">
                                                        {/* Gradient overlays */}
                                                        {files.length > 3 && (
                                                            <>
                                                                <div
                                                                    className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-xl"/>
                                                                <div
                                                                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-xl"/>
                                                            </>
                                                        )}

                                                        {/* Scrollable container */}
                                                        <div
                                                            className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide bg-slate-50 rounded-xl p-3">
                                                            <div className="flex gap-3">
                                                                {files.map((file, index) => {
                                                                    // Safety check
                                                                    if (!file || !previewUrls[index]) return null;

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="flex-shrink-0 relative group"
                                                                        >
                                                                            <div
                                                                                className="w-20 h-20 rounded-lg overflow-hidden bg-white border-2 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-primary/50 relative">
                                                                                {file.type.startsWith('image/') ? (
                                                                                    <img
                                                                                        src={previewUrls[index]}
                                                                                        alt={`Preview ${index + 1}`}
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div
                                                                                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                                                                        <Video
                                                                                            className="w-8 h-8 text-slate-500"/>
                                                                                    </div>
                                                                                )}

                                                                                {/* Remove button */}
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleRemoveFile(index)}
                                                                                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110 shadow-lg z-20"
                                                                                >
                                                                                    <X className="w-3 h-3"/>
                                                                                </button>

                                                                                {/* File info overlay */}
                                                                                <div
                                                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                    <div
                                                                                        className="absolute bottom-1 left-1 right-1">
                                                                                        <p className="text-xs font-medium text-white truncate">
                                                                                            {(file.size / 1024 / 1024).toFixed(1)} MB
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Index badge */}
                                                                                <div
                                                                                    className="absolute top-1 left-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-sm">
                                                                                    {index + 1}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            {/* Error Message */}
                            {isError && (
                                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="w-3 h-3 text-red-600"/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-900">
                                                დაფიქსირდა შეცდომა
                                            </p>
                                            <p className="text-xs text-red-700 mt-1">
                                                {(error as Error)?.message || 'გთხოვთ სცადოთ თავიდან'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer with Submit Button */}
                        <SheetFooter className="border-t border-slate-200 px-6 py-4 bg-slate-50/50 mt-auto">
                            <div className="space-y-2">
                                <Button
                                    type="submit"
                                    disabled={isPending || !bodyLength}
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            პოსტის შექმნა...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4"/>
                                            გამოქვეყნება
                                        </div>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-slate-500">
                                    დარწმუნდით, რომ პოსტი არ არღვევს საზოგადოების წესებს
                                </p>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </ThreadForm.Sheet>
        </ThreadForm>
    );
}