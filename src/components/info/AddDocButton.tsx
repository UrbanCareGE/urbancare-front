'use client';

import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FileText, Paperclip, Sparkles, Upload, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  addDocSchema,
  type AddDocFormValues,
} from '@/hooks/query/use-doc-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FileService } from '@/service/file-service';
import { InfoService } from '@/service/info-service';
import { useParams } from 'next/navigation';

const AddDocButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild className={'mx-4 bg-blue-500'}>
        <Button className={'m-4'}>ახალი დოკუმენტის ატვირთვა</Button>
      </SheetTrigger>
      <SheetContent
        side={'bottom'}
        className={'h-full bg-slate-50 flex flex-col'}
      >
        <SheetHeader
          className={
            'space-y-0 h-12 border-b relative flex items-center justify-center'
          }
        >
          <SheetTitle>დამატების ფორმა</SheetTitle>
          <SheetDescription className={'sr-only'}>
            დოკუმენტის დამატების შესაყვანი ფორმა
          </SheetDescription>
          <SheetClose className={'absolute right-3'}>
            <X className={'w-6 h-6 m-0 font-bold'} />
          </SheetClose>
        </SheetHeader>
        <AddDocFormBody onDone={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

interface AddDocFormBodyProps {
  onDone?: () => void;
}

const AddDocFormBody = ({ onDone }: AddDocFormBodyProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; name: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<AddDocFormValues>({
    resolver: zodResolver(addDocSchema),
    defaultValues: {
      title: '',
      type: 'TEXT',
      text: '',
      fileIds: [],
    },
  });

  const docType = form.watch('type');
  const titleLength = form.watch('title')?.length || 0;
  const textLength = form.watch('text')?.length || 0;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    for (const file of selectedFiles) {
      try {
        const response = await FileService.uploadPublicFile(file);
        const fileId = response.id;

        const currentFileIds = form.getValues('fileIds') || [];
        form.setValue('fileIds', [...currentFileIds, fileId], {
          shouldValidate: true,
        });
        setUploadedFiles((prev) => [...prev, { id: fileId, name: file.name }]);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }

    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const currentFileIds = form.getValues('fileIds') || [];
    form.setValue(
      'fileIds',
      currentFileIds.filter((id) => id !== fileId),
      { shouldValidate: true }
    );
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const onSubmit = async (data: AddDocFormValues) => {
    await InfoService.clientAddDoc(apartmentId, {
      title: data.title,
      fileType: data.type,
      textFileId: data.text,
      pdfFiles: data.fileIds,
    });
    onDone?.();
  };

  return (
    <Form {...form}>
      <form
        className={'flex flex-col flex-1'}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="px-6 py-6 space-y-5 flex-1 overflow-y-auto">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    აღწერა <span className="text-red-500">*</span>
                  </FormLabel>
                  <span
                    className={cn(
                      'text-xs font-medium transition-colors',
                      titleLength > 90
                        ? 'text-red-600'
                        : titleLength > 70
                          ? 'text-amber-600'
                          : 'text-slate-400'
                    )}
                  >
                    {titleLength}/100
                  </span>
                </div>
                <FormControl>
                  <Input
                    placeholder="დოკუმენტის სათაური..."
                    maxLength={100}
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Type Toggle */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 mb-2 block">
                  დოკუმენტის ტიპი
                </FormLabel>
                <FormControl>
                  <div className="flex rounded-lg p-1 bg-white">
                    <button
                      type="button"
                      onClick={() => field.onChange('TEXT')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
                        field.value === 'TEXT'
                          ? 'text-white/80 bg-primary hover:text-white shadow-sm'
                          : 'bg-white text-slate-900'
                      )}
                    >
                      <FileText className="w-4 h-4" />
                      ტექსტი
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('PDF')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
                        field.value === 'PDF'
                          ? 'text-white/80 bg-primary hover:text-white shadow-sm'
                          : 'bg-white text-slate-900'
                      )}
                    >
                      <Paperclip className="w-4 h-4" />
                      ფაილი
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Conditional: Text Area */}
          {docType === 'TEXT' && (
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      ტექსტი <span className="text-red-500">*</span>
                    </FormLabel>
                    <span
                      className={cn(
                        'text-xs font-medium transition-colors',
                        textLength > 4500
                          ? 'text-red-600'
                          : textLength > 4000
                            ? 'text-amber-600'
                            : 'text-slate-400'
                      )}
                    >
                      {textLength}/5000
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="დოკუმენტის ტექსტი..."
                      className="min-h-40 resize-none bg-white"
                      maxLength={5000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          )}

          {/* Conditional: File Upload */}
          {docType === 'PDF' && (
            <FormField
              control={form.control}
              name="fileIds"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-slate-400" />
                      ფაილები <span className="text-red-500">*</span>
                    </FormLabel>
                    <span className="text-xs text-slate-500">
                      {uploadedFiles.length}/10 ფაილი
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadedFiles.length >= 10 || isUploading}
                    className="w-full h-auto bg-white border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex flex-col items-center gap-2 py-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-700">
                          {isUploading ? 'იტვირთება...' : 'ფაილის ატვირთვა'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          PDF, DOC, XLS, TXT
                        </p>
                      </div>
                    </div>
                  </Button>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700 truncate max-w-[200px]">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.id)}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Footer with Submit Button */}
        <SheetFooter className="border-t border-slate-200 px-6 py-4 bg-slate-50/50 mt-auto">
          <Button
            type="submit"
            disabled={
              !titleLength ||
              (docType === 'TEXT' ? !textLength : !uploadedFiles.length)
            }
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              დოკუმენტის დამატება
            </div>
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default AddDocButton;
