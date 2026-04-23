'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadViewContent } from '@/components/thread/thread-card/thread-view/ThreadViewContent';
import { ThreadViewHeader } from '@/components/thread/thread-card/thread-view/ThreadViewHeader';
import { ThreadPreviewActionSection } from '@/components/thread/thread-card/thread-preview/ThreadPreviewActionSection';
import { ThreadPreviewStatsSection } from '@/components/thread/thread-card/common/ThreadPreviewStatsSection';
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
        <div className="flex flex-col gap-4 p-3 lg:p-0 lg:gap-5 lg:py-4">
          <button
            onClick={() => router.back()}
            className={cn(
              'group flex items-center gap-2 self-start',
              'pl-2 pr-3.5 py-1.5 rounded-urbancare-full',
              'bg-surface-container/70 text-text-secondary border border-border/60',
              'lg:hover:text-text-primary lg:hover:bg-surface-container lg:hover:border-border',
              'transition-all duration-200 active:scale-95'
            )}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-urbancare-sm font-medium leading-none">
              {t.common.goBack}
            </span>
          </button>

          <ThreadCard
            thread={data}
            className={cn(
              'shadow-sm shadow-shadow/5 ring-1 ring-border/50',
              'lg:hover:ring-border/70',
              'transition-all duration-200'
            )}
          >
            <ThreadCard.Header>
              <ThreadViewHeader />
            </ThreadCard.Header>
            <ThreadCard.Body>
              <ThreadViewContent />
            </ThreadCard.Body>
            <ThreadCard.Footer className="p-0 -mx-4 flex-col gap-0">
              <ThreadPreviewStatsSection />
              <div className="w-full px-2 py-1">
                <ThreadPreviewActionSection />
              </div>
            </ThreadCard.Footer>
          </ThreadCard>

          <ThreadCard
            thread={data}
            className={cn(
              'p-0 overflow-hidden',
              'shadow-sm shadow-shadow/5 ring-1 ring-border/50'
            )}
          >
            <ThreadCard.Header className="px-5 py-3.5 border-b border-border bg-surface-container/30">
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
