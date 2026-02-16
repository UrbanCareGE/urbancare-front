'use client';

import ThreadCard from '@/components/thread/mobile/thread-card/ThreadCard';
import { ThreadPreviewHeader } from '@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewHeader';
import { ThreadPreviewContent } from '@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewContent';
import React from 'react';
import { ThreadPreviewActionSection } from '@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewActionSection';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useParams } from 'next/navigation';

interface ThreadPreviewProps {
  threadId: string;
  defaultOpen: boolean;
}

function ThreadSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export const Thread = ({ threadId, defaultOpen }: ThreadPreviewProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);

  if (isPending && !data) {
    return <ThreadSkeleton />;
  }

  if (error) {
    return <div>coult not fetch data</div>;
  }

  return (
    <ThreadCard thread={data} className={'px-0'}>
      <ThreadCard.Header className={'px-3'}>
        <ThreadPreviewHeader />
      </ThreadCard.Header>
      <ThreadCard.Body className={'px-3'}>
        <ThreadPreviewContent />
      </ThreadCard.Body>
      <ThreadCard.Footer className={'flex-col px-0'}>
        {/*<ThreadPreviewStatsSection/>*/}
        <ThreadPreviewActionSection />
      </ThreadCard.Footer>
    </ThreadCard>
  );
};
