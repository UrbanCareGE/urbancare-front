'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadViewContent } from '@/components/thread/thread-card/thread-view/ThreadViewContent';
import { ThreadViewHeader } from '@/components/thread/thread-card/thread-view/ThreadViewHeader';
import { ThreadPreviewActionSection } from '@/components/thread/thread-card/thread-preview/ThreadPreviewActionSection';
import { ThreadCommentsHeader } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentsHeader';
import { ThreadCommentGrid } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentGrid';
import { ThreadViewCommentButton } from '@/components/thread/thread-card/thread-view/comment/ThreadViewCommentButton';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const { user } = useAuth();
  const apartmentId = user.selectedApartmentId!;
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);
  const router = useRouter();

  if (isPending || error) {
    return null;
  }

  return (
    <div className={'flex flex-col h-full gap-5 p-3 lg:p-0'}>
      <button
        onClick={() => router.back()}
        className={cn(
          'group flex items-center gap-2 self-start',
          'px-2 py-1.5  rounded-lg',
          'text-text-secondary hover:text-text-primary',
          'hover:bg-surface-container',
          'transition-all duration-200 active:scale-95'
        )}
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span className="text-sm font-medium">უკან დაბრუნება</span>
      </button>

      <ThreadCard thread={data} className="px-3">
        <ThreadCard.Header className="px-3">
          <ThreadViewHeader />
        </ThreadCard.Header>
        <ThreadCard.Body className="px-3">
          <ThreadViewContent />
        </ThreadCard.Body>
        <ThreadCard.Footer className="flex-col px-0">
          <ThreadPreviewActionSection />
        </ThreadCard.Footer>
      </ThreadCard>

      <ThreadCard thread={data} className="px-0">
        <ThreadCard.Header className="border-b border-border px-3 pb-3">
          <ThreadCommentsHeader />
        </ThreadCard.Header>
        <ThreadCard.Body>
          <ThreadCommentGrid />
        </ThreadCard.Body>
      </ThreadCard>

      <ThreadViewCommentButton thread={data} className={'mt-auto'} />
    </div>
  );
}
