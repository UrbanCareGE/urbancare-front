'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useCreateUrgent } from '@/hooks/query/urgent/use-create-urgent';
import { UrgentItemDTO } from '@/model/dto/urgent.dto';
import { PlusIcon } from 'lucide-react';

const CreateUrgentButtonMobile = () => {
  const [text, setText] = useState<string>('');
  const [open, setOpen] = useState(false);

  const onSuccess = (item: UrgentItemDTO) => {
    setText('');
    setOpen(false);
  };

  const { onSubmit, isPending, isError, error } = useCreateUrgent(onSuccess);

  const handleAdd = () => {
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <div
          className={
            'fixed bottom-20 right-4 p-3 rounded-full aspect-square bg-primary'
          }
        >
          <PlusIcon className={'w-8 h-8 text-white'} />
        </div>
      </DrawerTrigger>
      <DrawerContent className={'bg-white'}>
        <DrawerHeader>
          <DrawerTitle className={'text-md'}>
            დააფიქსირეთ სასწრაფო შეტყობინება
          </DrawerTitle>
        </DrawerHeader>
        <div className={'px-4'}>
          <Textarea
            placeholder={'შეიყვანეთ ტექსტი'}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            disabled={isPending}
          />
        </div>
        <DrawerFooter>
          <Button onClick={handleAdd} disabled={isPending || !text.trim()}>
            {isPending ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>

          {isError && (
            <p className="text-red-500 text-sm">შეცდომა: {error?.message}</p>
          )}

          <DrawerClose asChild>
            <Button variant="outline">გაუქმება</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateUrgentButtonMobile;
