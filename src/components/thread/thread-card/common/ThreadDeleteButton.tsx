import { useAuth } from '@/components/provider/AuthProvider';
import { Button } from '@/components/ui/button';
import { DeleteIcon, LogOut } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';
import { useDeleteThread } from '@/hooks/query/thread/use-delete-thread';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

export const ThreadDeleteButton = () => {
  const { thread } = useThread();
  const { mutate, isPending } = useDeleteThread();

  const handleDelete = () => {
    mutate(thread.id);
  };
  return (
    <Button
      className="flex w-full items-center justify-center gap-2 px-4 py-1 bg-error-container text-error rounded-panel font-medium text-base lg:hover:bg-error/50 lg:hover:text-error-foreground"
      onClick={handleDelete}
      disabled={isPending}
    >
      <DeleteIcon className="w-5 h-5" />
      წაშლა
      {isPending && <Spinner />}
    </Button>
  );
};