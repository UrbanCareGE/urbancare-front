'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';
import { Thread } from '@/components/thread/thread-card/Thread';
import { ThreadCommentSection } from '@/components/thread/thread-card/ThreadCommentSection';
import { ThreadViewCommentButton } from '@/components/thread/thread-card/thread-view/comment/ThreadViewCommentButton';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export default function ThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const { user } = useAuth();
  const apartmentId = user.selectedApartmentId!;
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);
  const router = useRouter();
  const t = useTranslation();

  if (isPending || error) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden lg:flex-none lg:block">
      <div className="flex-1 overflow-y-auto scrollbar-hide lg:overflow-visible">
        <div className="flex flex-col gap-4 p-3 lg:p-0 lg:gap-5">
          <button
            onClick={() => router.back()}
            className={cn(
              'group flex items-center gap-2 self-start',
              'pl-2 pr-3.5 py-1.5 urbancare-rounded-full',
              'bg-surface-container/70 text-text-secondary border border-border/60',
              'lg:hover:text-text-primary lg:hover:bg-surface-container lg:hover:border-border',
              'transition-all duration-200 active:scale-95'
            )}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="urbancare-text-sm font-medium leading-none">
              {t.common.goBack}
            </span>
          </button>

          <Thread
            threadId={threadId}
            expanded
            className={cn(
              'shadow-sm shadow-shadow/5 ring-1 ring-border/50',
              'lg:hover:ring-border/70',
              'transition-all duration-200'
            )}
          />

          <ThreadCommentSection threadId={threadId} />
        </div>
      </div>

      <ThreadViewCommentButton
        thread={data}
        className="border-t border-border bg-surface lg:border-t-0 lg:bg-transparent lg:hidden"
      />
    </div>
  );
}
