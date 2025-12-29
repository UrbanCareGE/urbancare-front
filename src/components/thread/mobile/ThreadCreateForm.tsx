'use client'

import React, {useRef, useState} from "react";
import {CreateThreadButton} from "@/components/thread/mobile/CreateThreadButton";
import ThreadForm from "@/components/thread/mobile/thread-form/ThreadForm";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {DrawerClose} from "@/components/ui/drawer";
import {
    BarChart2,
    Check,
    FileText,
    Image as ImageIconLucide,
    Info,
    Plus,
    Sparkles,
    Tag,
    Upload,
    Video,
    X
} from "lucide-react";
import {useCreateThread} from "@/hooks/query/thread/use-create-thread";
import {ThreadTagConfig, ThreadTagType, ThreadTagValue} from "@/model/thread.dto";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {useDevice} from "@/hooks/use-device";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {FileService} from "@/service/file-service";
import {FileEntry} from "@/components/thread/mobile/data/create-thread-schema";

const ALL_TAGS = Object.values(ThreadTagType);

export const ThreadCreateForm = () => {
    const [fileUploading, setFileUploading] = useState(false);
    const {form, onSubmit, isPending, isError, error} = useCreateThread();
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
    const fileEntries = form.watch("files") || [];
    const selectedTags = form.watch("tags") || [];
    const pollOptions = form.watch("pollOptions") || [];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        const currentFiles = form.getValues("files") || [];

        const availableSlots = 5 - currentFiles.length;
        const filesToAdd = selectedFiles.slice(0, availableSlots);

        const newEntries: FileEntry[] = filesToAdd.map((file) => ({
            file,
            fileId: null,
            previewUrl: URL.createObjectURL(file),
        }));

        // Add to form immediately (shows preview with loading state)
        const updatedFiles = [...currentFiles, ...newEntries];
        form.setValue("files", updatedFiles, {shouldValidate: true});

        // Clear input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setFileUploading(true);

        const results = await Promise.allSettled(
            newEntries.map(async (entry, index) => {
                const result = await FileService.uploadPublicFile(entry.file);
                return {index: currentFiles.length + index, fileId: result.id};
            })
        );

        const currentFormFiles = form.getValues("files") || [];
        const updatedFormFiles = currentFormFiles.map((f, i) => {
            const success = results.find(
                (r) => r.status === 'fulfilled' && r.value.index === i
            );
            const failed = results.find(
                (r) => r.status === 'rejected' // need to track index differently
            );

            if (success && success.status === 'fulfilled') {
                return {...f, fileId: success.value.fileId, status: 'success' as const};
            }
            // handle errors...
            return f;
        });
        form.setValue("files", updatedFormFiles, {shouldValidate: true});

        setFileUploading(false);
    };

    const handleRemoveFile = (index: number) => {
        const currentFiles = form.getValues("files") || [];
        const fileToRemove = currentFiles[index];

        // Revoke preview URL
        if (fileToRemove?.previewUrl) {
            URL.revokeObjectURL(fileToRemove.previewUrl);
        }

        // Remove from form
        const newFiles = currentFiles.filter((_, i) => i !== index);
        form.setValue("files", newFiles, {shouldValidate: true});
    };

    React.useEffect(() => {
        return () => {
            const files = form.getValues("files") || [];
            files.forEach(file => {
                if (file.previewUrl) {
                    URL.revokeObjectURL(file.previewUrl);
                }
            });
        };
    }, []);

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
                <SheetHeader className="border-b border px-3 py-3">
                    <SheetDescription className={"sr-only"}>ახალი პოსტის შექმნის ფორმა</SheetDescription>
                    <div className="flex items-center gap-2">
                        <div className={"w-8"}></div>
                        <div className={"mr-auto ml-auto"}>
                            <SheetTitle className="text-lg font-semibold text-foreground-primary">
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
                                                className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-foreground-disabled"/>
                                                ტექსტი <span className="text-error">*</span>
                                            </FormLabel>
                                            <span className={cn(
                                                "text-xs font-medium transition-colors",
                                                bodyLength > 1900 ? "text-error" :
                                                    bodyLength > 1700 ? "text-warning" :
                                                        "text-foreground-disabled"
                                            )}>
                                                {bodyLength}/2000
                                            </span>
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                placeholder="რას გააზიარებთ? გაგვიზიარეთ თქვენი აზრები, გამოცდილება ან შეკითხვა..."
                                                disabled={isPending}
                                                className="min-h-40 resize-none text-base border bg-surface focus:border-primary focus:ring-primary/20 transition-all"
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
                                    <Tag className="w-4 h-4 text-foreground-disabled"/>
                                    <span className="text-sm font-medium text-foreground-secondary">გახადეთ პოსტი სპეციფიური</span>
                                    {isMobile ? (
                                        <Popover>
                                            <PopoverTrigger>
                                                <Info className="w-4 h-4 text-foreground-disabled"/>
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-tooltip text-primary-foreground text-center">
                                                თეგი გაძლევთ საშუალებას თქვენი პოსტი გახდეს უფრო სპეციფიური, თუ
                                                მიუთითებთ შესაბამის თეგებს, პოსტი გამოჩნდება შესაბამისი ძებნის ფილტრების
                                                მითითების შემდეგაც
                                            </PopoverContent>
                                        </Popover>
                                    ) : (
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Info className="w-4 h-4 text-foreground-disabled"/>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="bg-surface-variant opacity-100">
                                                აირჩიეთ თეგები თქვენი პოსტისთვის
                                            </HoverCardContent>
                                        </HoverCard>
                                    )}
                                </div>

                                {/* Selected tags */}
                                <div className="space-y-2">
                                    {selectedTags.length === 0 ? (
                                        <p className="text-sm text-foreground-tertiary">სპეციფიკაცია არ არის არჩეული</p>
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
                                                        'px-3 py-1 rounded-full text-sm font-medium border border bg-surface text-foreground-tertiary transition-all',
                                                        'hover:border-hover hover:bg-surface-variant'
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
                                                className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
                                                <ImageIconLucide className="w-4 h-4 text-foreground-disabled"/>
                                                მედია ფაილები
                                            </FormLabel>
                                            <span className="text-xs text-foreground-tertiary">
                                                {fileEntries.length}/5 ფაილი
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
                                                disabled={fileEntries.length >= 5 || isPending}
                                                className="w-full h-auto border-2 border-dashed border hover:border-primary hover:bg-primary/5 transition-all group"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-surface-container group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                                        <Upload
                                                            className="w-5 h-5 text-foreground-tertiary group-hover:text-primary transition-colors"/>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium text-foreground-secondary">
                                                            ფოტოს ან ვიდეოს ატვირთვა
                                                        </p>
                                                        <p className="text-xs text-foreground-tertiary mt-0.5">
                                                            მაქს. 5 ფაილი, თითო 10MB-მდე
                                                        </p>
                                                    </div>
                                                </div>
                                            </Button>

                                            {/* File Preview */}
                                            {fileEntries.length > 0 && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between px-1">
                                                        <p className="text-xs font-medium text-foreground-tertiary">
                                                            ატვირთული ფაილები
                                                        </p>
                                                        {fileEntries.length > 3 && (
                                                            <p className="text-xs text-foreground-disabled">
                                                                ← გადაფურცლეთ →
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="relative">
                                                        {/* Gradient overlays */}
                                                        {fileEntries.length > 3 && (
                                                            <>
                                                                <div
                                                                    className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none rounded-l-xl"/>
                                                                <div
                                                                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none rounded-r-xl"/>
                                                            </>
                                                        )}

                                                        {/* Scrollable container */}
                                                        <div
                                                            className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide bg-surface-variant rounded-xl p-3">
                                                            <div className="flex gap-3">
                                                                {fileEntries.map((file, index) => {
                                                                    // Safety check
                                                                    if (!file || !fileEntries[index].previewUrl) return null;

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="flex-shrink-0 relative group"
                                                                        >
                                                                            <div
                                                                                className="w-20 h-20 rounded-lg overflow-hidden bg-surface border-2 border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-primary/50 relative">
                                                                                {file.file.type.startsWith('image/') ? (
                                                                                    <img
                                                                                        src={fileEntries[index].previewUrl}
                                                                                        alt={`Preview ${index + 1}`}
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div
                                                                                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
                                                                                        <Video
                                                                                            className="w-8 h-8 text-foreground-tertiary"/>
                                                                                    </div>
                                                                                )}

                                                                                {/* Remove button */}
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleRemoveFile(index)}
                                                                                    className="absolute -top-2 -right-2 p-1.5 bg-error text-error-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-error-hover hover:scale-110 shadow-lg z-20"
                                                                                >
                                                                                    <X className="w-3 h-3"/>
                                                                                </button>

                                                                                {/* File info overlay */}
                                                                                <div
                                                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                    <div
                                                                                        className="absolute bottom-1 left-1 right-1">
                                                                                        <p className="text-xs font-medium text-primary-foreground truncate">
                                                                                            {(file.file.size / 1024 / 1024).toFixed(1)} MB
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Index badge */}
                                                                                <div
                                                                                    className="absolute top-1 left-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold shadow-sm">
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
                                        <BarChart2 className="w-4 h-4 text-foreground-disabled"/>
                                        <span className="text-sm font-medium text-foreground-secondary">გამოკითხვა</span>
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
                                    <div className="space-y-3 p-4 bg-surface-variant rounded-lg border border">
                                        {/* Allow others toggle */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-foreground-primary">
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
                                                            className="flex items-center justify-between p-2 bg-surface rounded-md border border cursor-pointer hover:border-primary/50 transition-colors"
                                                        >
                                                            <span
                                                                className="text-sm text-foreground-secondary">{index + 1}) {option}</span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemovePollOption(index);
                                                                }}
                                                                className="p-1 hover:bg-surface-container rounded transition-colors"
                                                            >
                                                                <X className="w-4 h-4 text-foreground-tertiary"/>
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
                                                    className="flex-1 px-3 py-2 text-sm border border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddPollOption}
                                                    className="w-8 h-8 flex justify-center items-center bg-success rounded-full"
                                                >
                                                    <Check size={18} className="text-success-foreground"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancelAddOption}
                                                    className="w-8 h-8 flex justify-center items-center bg-error rounded-full"
                                                >
                                                    <X size={18} className="text-error-foreground"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setIsAddingOption(true)}
                                                className="flex items-center gap-2 w-full p-2 text-sm text-foreground-primary hover:text-foreground-secondary bg-surface rounded-md border border-dashed border transition-colors"
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
                                <div className="rounded-lg bg-error-background border border-error p-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="w-3 h-3 text-error"/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-error">
                                                დაფიქსირდა შეცდომა
                                            </p>
                                            <p className="text-xs text-error mt-1">
                                                {(error as Error)?.message || 'გთხოვთ სცადოთ თავიდან'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer with Submit Button */}
                        <SheetFooter className="border-t border px-6 py-4 bg-surface-variant/50 mt-auto">
                            <div className="space-y-2">
                                <Button
                                    type="submit"
                                    disabled={isPending || !bodyLength || fileUploading}
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
                                <p className="text-xs text-center text-foreground-tertiary">
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
                className="flex-1 px-3 py-2 text-sm border border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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