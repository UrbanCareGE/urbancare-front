'use client'

import React, {useRef, useState} from "react";
import {StartThreadForm} from "@/components/thread/mobile/StartThreadForm";
import ThreadForm from "@/components/thread/mobile/thread-form/ThreadForm";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {DrawerClose, DrawerFooter} from "@/components/ui/drawer";
import {ImageIcon, PhoneIcon, Video, X} from "lucide-react";
import {useCreateThread} from "@/hooks/query/use-create-thread";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInputWithIconWrapper} from "@/components/auth/FormInput";
import {Card} from "@/components/ui/card";
import {useThreadDrawer} from "@/components/thread/mobile/thread-card/ThreadCard";


export const ThreadCreateForm = () => {
        const {form, onSubmit, isPending, isError, error} = useCreateThread();
        const [files, setFiles] = useState<File[]>([]);
        const [previewUrls, setPreviewUrls] = useState<string[]>([]);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const categories = [
            {value: "general", label: "ზოგადი", color: "from-green-400 to-emerald-500"},
            {value: "events", label: "ღონისძიებები", color: "from-purple-400 to-pink-500"},
            {value: "ask", label: "კითხვა", color: "from-blue-400 to-cyan-500"},
            {value: "lost_found", label: "დაკარგული/ნაპოვნი", color: "from-amber-400 to-orange-500"},
            {value: "safety", label: "უსაფრთხოება", color: "from-red-400 to-rose-500"},
        ];

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

        // const handleReset = () => {
        //     setTitle("");
        //     setContent("");
        //     setCategory("");
        //     setFiles([]);
        //     previewUrls.forEach(url => URL.revokeObjectURL(url));
        //     setPreviewUrls([]);
        //     if (fileInputRef.current) {
        //         fileInputRef.current.value = "";
        //     }
        // };


        return (
            <ThreadForm>
                <ThreadForm.Trigger>
                    <StartThreadForm/>
                </ThreadForm.Trigger>
                <ThreadForm.Drawer>
                    <Form {...form}>
                        <form className="p-6 flex flex-col gap-3"
                              onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                {/*<Label htmlFor="category" className="text-sm font-medium text-slate-700">*/}
                                {/*    კატეგორია **/}
                                {/*</Label>*/}
                                {/*<Select value={category} onValueChange={setCategory}>*/}
                                {/*    <SelectTrigger id="category" className="w-full">*/}
                                {/*        <SelectValue placeholder="აირჩიეთ კატეგორია"/>*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent className={"bg-white shadow-xl"}>*/}
                                {/*        {categories.map((cat) => (*/}
                                {/*            <SelectItem key={cat.value} value={cat.value}>*/}
                                {/*                <div className="flex items-center gap-2">*/}
                                {/*                    <div*/}
                                {/*                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}/>*/}
                                {/*                    {cat.label}*/}
                                {/*                </div>*/}
                                {/*            </SelectItem>*/}
                                {/*        ))}*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                                    სათაური (არასავალდებულო)
                                </Label>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    id="title"
                                                    placeholder="დაამატეთ სათაური..."
                                                    disabled={isPending}
                                                    className="text-base"
                                                    maxLength={100}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <p className="text-xs text-slate-500 text-right">
                                    {form.getValues().title.length}/100
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="content" className="text-sm font-medium text-slate-700">
                                    შინაარსი *
                                </Label>
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormControl className={"w-full"}>
                                                <Textarea
                                                    id="body"
                                                    placeholder="რას გააზიარებთ?"
                                                    disabled={isPending}
                                                    className="min-h-40 resize-none text-base focus-visible:ring-2 focus-visible:ring-primary"
                                                    maxLength={2000}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <p className="text-xs text-slate-500 text-right">
                                    {form.getValues().body.length}/2000
                                </p>
                            </div>

                            {/* File Upload */}
                            <div className="space-y-3 pb-3">
                                <Label className="text-sm font-medium text-slate-700">
                                    ფოტო/ვიდეო (მაქს. 5)
                                </Label>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={files.length >= 5 || isPending}
                                        className="flex-1 gap-1 text-gray-600 flex items-center"
                                    >
                                        <ImageIcon className="w-4 h-4"/>
                                        ფოტო
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={files.length >= 5 || isPending}
                                        className="flex-1 gap-2 text-gray-600"
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
                                    <div className="flex overflow-hidden">
                                        {previewUrls.map((url, index) => (
                                            <div
                                                key={index}
                                                className="relative group rounded-xl overflow-hidden bg-slate-100 w-32 h-32 aspect-square"
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
                            {isError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">
                                        შეცდომა: {(error as Error)?.message || 'დაფიქსირდა შეცდომა'}
                                    </p>
                                </div>
                            )}
                            <DrawerFooter className="border-slate-200 pt-4 p-0">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 text-base font-medium bg-primary"
                                >
                                    {isPending ? (
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
                                        className="w-full h-12 bg-red-50 hover:bg-red-100 text-red-600 rounded-panel transition-colors font-medium text-base"
                                    >
                                        გაუქმება
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </ThreadForm.Drawer>
            </ThreadForm>
        );
    }
;
