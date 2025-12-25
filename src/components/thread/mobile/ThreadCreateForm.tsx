'use client'

import React, {useRef, useState} from "react";
import {CreateThreadButton} from "@/components/thread/mobile/CreateThreadButton";
import ThreadForm from "@/components/thread/mobile/thread-form/ThreadForm";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {DrawerClose, DrawerTitle} from "@/components/ui/drawer";
import {BarChart2, Check, FileText, Image as ImageIconLucide, Info, Plus, Sparkles, Tag, Upload, Video, X} from "lucide-react";
import {useCreateThread} from "@/hooks/query/use-create-thread";
import {ThreadTagConfig, ThreadTagType, ThreadTagValue} from "@/model/thread.dto";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useDevice} from "@/hooks/use-device";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

const ALL_TAGS = Object.values(ThreadTagType);

export const ThreadCreateForm = () => {
    const {form, onSubmit, isPending, isError, error} = useCreateThread();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {isMobile} = useDevice();

    // Tags dialog state
    const [tagLimitDialogOpen, setTagLimitDialogOpen] = useState(false);

    // Poll UI state (not form data)
    const [isPollMode, setIsPollMode] = useState(false);
    const [allowOthersToAdd, setAllowOthersToAdd] = useState(false);
    const [isAddingOption, setIsAddingOption] = useState(false);
    const [currentOption, setCurrentOption] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Watch form values
    const titleLength = form.watch("title")?.length || 0;
    const bodyLength = form.watch("body")?.length || 0;
    const files = form.watch("files") || [];
    const selectedTags = form.watch("tags") || [];
    const pollOptions = form.watch("pollOptions") || [];

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

    // Poll handlers
    const handleAddPollOption = () => {
        if (!currentOption.trim()) return;
        form.setValue("pollOptions", [...pollOptions, currentOption.trim()]);
        setCurrentOption('');
        setIsAddingOption(false);
    };

    const handleRemovePollOption = (index: number) => {
        form.setValue("pollOptions", pollOptions.filter((_, i) => i !== index));
    };

    const handleCancelAddOption = () => {
        setCurrentOption('');
        setIsAddingOption(false);
    };

    const handleTogglePollMode = () => {
        if (isPollMode) {
            // Reset poll state when disabling
            form.setValue("pollOptions", []);
            setAllowOthersToAdd(false);
            setIsAddingOption(false);
            setCurrentOption('');
            setEditingIndex(null);
        }
        setIsPollMode(!isPollMode);
    };

    const handleSaveEdit = (index: number, value: string) => {
        if (!value.trim()) return;
        const newOptions = [...pollOptions];
        newOptions[index] = value.trim();
        form.setValue("pollOptions", newOptions);
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    const handleSelectTag = (tag: ThreadTagValue) => {
        if (selectedTags.length >= 3) {
            setTagLimitDialogOpen(true);
            return;
        }
        form.setValue("tags", [...selectedTags, tag]);
    };

    const handleDeselectTag = (tag: string) => {
        form.setValue("tags", selectedTags.filter(t => t !== tag));
    };

    const unselectedTags = ALL_TAGS.filter(tag => !selectedTags.includes(tag));

    return (
        <ThreadForm>
            <ThreadForm.Trigger>
                <CreateThreadButton/>
            </ThreadForm.Trigger>
            <ThreadForm.Sheet>
                {/* Header */}
                <SheetHeader className="border-b border-slate-200 px-3 py-3">
                    <SheetDescription className={"sr-only"}>ახალი პოსტის შექმნის ფორმა</SheetDescription>
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
                                                className="min-h-40 resize-none text-base border-slate-200 bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                                maxLength={2000}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            {/* Tag Selection Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-slate-400"/>
                                    <span className="text-sm font-medium text-slate-700">გახადეთ პოსტი სპეციფიური</span>
                                    {isMobile ? (
                                        <Popover>
                                            <PopoverTrigger>
                                                <Info className="w-4 h-4 text-slate-400"/>
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-tooltip text-slate-50 text-center">
                                                თეგი გაძლევთ საშუალებას თქვენი პოსტი გახდეს უფრო სპეციფიური, თუ მიუთითებთ შესაბამის თეგებს, პოსტი გამოჩნდება შესაბამისი ძებნის ფილტრების მითითების შემდეგაც
                                            </PopoverContent>
                                        </Popover>
                                    ) : (
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Info className="w-4 h-4 text-slate-400"/>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="bg-slate-50 opacity-100">
                                                აირჩიეთ თეგები თქვენი პოსტისთვის
                                            </HoverCardContent>
                                        </HoverCard>
                                    )}
                                </div>

                                {/* Selected tags */}
                                <div className="space-y-2">
                                    {selectedTags.length === 0 ? (
                                        <p className="text-sm text-slate-500">სპეციფიკაცია არ არის არჩეული</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTags.map((tag) => {
                                                const config = ThreadTagConfig[tag as ThreadTagValue];
                                                return (
                                                    <button
                                                        key={tag}
                                                        type="button"
                                                        onClick={() => handleDeselectTag(tag)}
                                                        className={cn(
                                                            'px-3 py-1 rounded-full text-sm font-medium transition-all',
                                                            config.bg,
                                                            config.text,
                                                            'hover:opacity-70'
                                                        )}
                                                    >
                                                        {config.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Available tags */}
                                {unselectedTags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {unselectedTags.map((tag) => {
                                            const config = ThreadTagConfig[tag];
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleSelectTag(tag)}
                                                    className={cn(
                                                        'px-3 py-1 rounded-full text-sm font-medium border border-slate-200 bg-white text-slate-600 transition-all',
                                                        'hover:border-slate-300 hover:bg-slate-50'
                                                    )}
                                                >
                                                    {config.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

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

                            {/* Poll Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-slate-400"/>
                                        <span className="text-sm font-medium text-slate-700">გამოკითხვა</span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant={isPollMode ? "default" : "mobile-outline"}
                                        size="sm"
                                        onClick={handleTogglePollMode}
                                        className="h-8"
                                    >
                                        {isPollMode ? "გამორთვა" : "დამატება"}
                                    </Button>
                                </div>

                                {isPollMode && (
                                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        {/* Allow others toggle */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-sky-900">
                                                სხვებს შეუძლიათ ვარიანტების დამატება
                                            </span>
                                            <Switch
                                                checked={allowOthersToAdd}
                                                onCheckedChange={setAllowOthersToAdd}
                                            />
                                        </div>

                                        {/* Existing options */}
                                        {pollOptions.length > 0 && (
                                            <div className="space-y-2">
                                                {pollOptions.map((option, index) => (
                                                    editingIndex === index ? (
                                                        <EditableOption
                                                            key={index}
                                                            initialValue={option}
                                                            onSave={(value) => handleSaveEdit(index, value)}
                                                            onCancel={handleCancelEdit}
                                                        />
                                                    ) : (
                                                        <div
                                                            key={index}
                                                            onClick={() => setEditingIndex(index)}
                                                            className="flex items-center justify-between p-2 bg-white rounded-md border border-slate-200 cursor-pointer hover:border-primary/50 transition-colors"
                                                        >
                                                            <span className="text-sm text-slate-700">{index + 1}) {option}</span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemovePollOption(index);
                                                                }}
                                                                className="p-1 hover:bg-slate-100 rounded transition-colors"
                                                            >
                                                                <X className="w-4 h-4 text-slate-500"/>
                                                            </button>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}

                                        {/* Add option input */}
                                        {isAddingOption ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={currentOption}
                                                    onChange={(e) => setCurrentOption(e.target.value)}
                                                    placeholder="ვარიანტის ტექსტი..."
                                                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddPollOption}
                                                    className="w-8 h-8 flex justify-center items-center bg-green-500 rounded-full"
                                                >
                                                    <Check size={18} className="text-white"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancelAddOption}
                                                    className="w-8 h-8 flex justify-center items-center bg-red-500 rounded-full"
                                                >
                                                    <X size={18} className="text-white"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setIsAddingOption(true)}
                                                className="flex items-center gap-2 w-full p-2 text-sm text-sky-950 hover:text-slate-800 bg-white rounded-md border border-dashed border-slate-300 transition-colors"
                                            >
                                                <Plus size={16}/>
                                                ვარიანტის დამატება
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

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
                                        <DrawerClose asChild={true}>
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4"/>
                                                გამოქვეყნება
                                            </div>
                                        </DrawerClose>
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

            <Dialog open={tagLimitDialogOpen} onOpenChange={setTagLimitDialogOpen}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>თეგების ლიმიტი</DialogTitle>
                        <DialogDescription>
                            თითოეულ პოსტზე შესაძლებელია მაქსიმუმ 3 თეგის მითითება.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="default" onClick={() => setTagLimitDialogOpen(false)}>
                            გასაგებია
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ThreadForm>
    );
}

interface EditableOptionProps {
    initialValue: string;
    onSave: (value: string) => void;
    onCancel: () => void;
}

const EditableOption = ({initialValue, onSave, onCancel}: EditableOptionProps) => {
    const [value, setValue] = useState(initialValue);

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
            />
            <button
                type="button"
                onClick={() => onSave(value)}
                className="w-8 h-8 flex justify-center items-center bg-green-500 rounded-full"
            >
                <Check size={18} className="text-white"/>
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="w-8 h-8 flex justify-center items-center bg-red-500 rounded-full"
            >
                <X size={18} className="text-white"/>
            </button>
        </div>
    );
};