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
      {/* Scrollable area: full-height scroll on mobile, natural flow on desktop */}
      <div className="flex-1 overflow-y-auto scrollbar-hide lg:overflow-visible">
        <div className="flex flex-col gap-5 p-3 lg:p-0">
          <button
            onClick={() => router.back()}
            className={cn(
              'group flex items-center gap-2 self-start',
              'px-2 py-1.5 rounded-urbancare-lg',
              'text-text-secondary hover:text-text-primary',
              'hover:bg-surface-container',
              'transition-all duration-200 active:scale-95'
            )}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-urbancare-base font-medium">{t.common.goBack}</span>
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
        </div>
      </div>

      {/* Comment input: anchored below scroll area on mobile, flows with content on desktop */}
      <ThreadViewCommentButton
        thread={data}
        className="border-t border-border bg-surface lg:border-t-0 lg:bg-transparent lg:hidden"
      />
    </div>
  );
}
