'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/components/provider/AuthProvider';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Thread } from '@/components/thread/mobile/thread-card/Thread';
import { ThreadCreateForm } from '@/components/thread/mobile/ThreadCreateForm';
import { useInfiniteThreads } from '@/hooks/query/thread/use-fetch-threads';
import { useSearchParams } from 'next/dist/client/components/navigation';

export interface ThreadFeedProps {
  defaultTags?: string[];
}

export default function ThreadFeed({ defaultTags = [] }: ThreadFeedProps) {
  const searchParams = useSearchParams();
  const queryThreadId = searchParams.get('threadId');
  const { user, isLoading: isUserLoading } = useAuth();
  const apartmentId = user?.selectedApartment?.id;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '400px',
  });

  const {
    data,
    error,
    isLoading: isPostFetchLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteThreads(
    apartmentId,
    defaultTags.length > 0 ? defaultTags : undefined
  );

  // Refetch when tags change
  useEffect(() => {
    refetch();
  }, [defaultTags, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isUserLoading || (isPostFetchLoading && !data)) {
    return (
      <div className="flex-1 w-full bg-slate-100 space-y-4 py-4">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <StartThreadFormSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full bg-slate-100">
        <div className="max-w-2xl mx-auto px-4 pt-24">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">Failed to load threads</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-scroll space-y-4 py-4">
      <div className="max-w-2xl mx-auto px-3">
        <ThreadCreateForm />
      </div>

      {data?.pages.map((page) => (
        <div key={page.number} className="max-w-2xl mx-auto px-3 space-y-4">
          {page.content.map((threadId) => {
            return (
              <Thread key={threadId} threadId={threadId} defaultOpen={false} />
            );
          })}
        </div>
      ))}

      {queryThreadId != null && (
        <Thread
          key={queryThreadId}
          threadId={queryThreadId}
          defaultOpen={true}
        />
      )}

      {isFetchingNextPage && <LoadingSkeleton />}
      {hasNextPage && <div ref={ref} className="h-20" />}

      {!hasNextPage && data?.pages && data.pages.length > 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          🎉 No more threads
        </div>
      )}
    </div>
  );
}

export type StartThreadFormSkeletonProps = {
  className?: string;
};

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse"
        >
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
      ))}
    </div>
  );
}

export function StartThreadFormSkeleton({
  className,
}: StartThreadFormSkeletonProps) {
  return (
    <Card
      className={cn(
        'flex shadow-lg border-slate-200 bg-white animate-pulse p-3 items-center',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0" />
      <div className="flex-1 px-4 py-3">
        <div className="bg-slate-200 rounded-xl h-6 w-full mr-auto" />
      </div>
    </Card>
  );
}
