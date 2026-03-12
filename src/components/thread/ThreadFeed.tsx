'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/components/provider/AuthProvider';
import { useInfiniteThreads } from '@/hooks/query/thread/use-fetch-threads';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TagsFilterSchema } from '@/components/thread/data/thread-filter-schema';
import { TagsFilterMobile } from '@/components/thread/filter/TagsFilter.mobile';
import { TagsFilterDesktop } from '@/components/thread/filter/TagsFilter.desktop';
import { CreateThreadFormContainer } from '@/components/thread/thread-form/CreateThreadForm';
import { Thread } from '@/components/thread/thread-card/Thread';

export interface ThreadFeedProps {
  defaultTags?: string[];
}

export default function ThreadFeed({ defaultTags = [] }: ThreadFeedProps) {
  const { user } = useAuth();
  const apartmentId = user.selectedApartmentId!;

  const form = useForm<z.infer<typeof TagsFilterSchema>>({
    resolver: zodResolver(TagsFilterSchema),
    defaultValues: {
      tags: defaultTags,
    },
  });
  const selectedTags = form.watch('tags');

  const inViewOptions = useMemo(
    () => ({
      threshold: 0.1,
      rootMargin: '256px',
    }),
    []
  );

  const { ref, inView } = useInView(inViewOptions);

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
    selectedTags.length > 0 ? selectedTags : null
  );

  const prevThreadCountRef = useRef(0);
  const newPageFirstThreadRef = useRef<string | null>(null);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allThreads = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.content.map((threadId) => ({
        threadId,
        pageNumber: page.page.number,
      }))
    );
  }, [data?.pages]);

  // After new page loads, scroll to the first new thread
  useEffect(() => {
    const prevCount = prevThreadCountRef.current;
    const currentCount = allThreads.length;

    if (currentCount > prevCount && prevCount > 0) {
      const firstNewThreadId = allThreads[prevCount]?.threadId;
      if (firstNewThreadId) {
        newPageFirstThreadRef.current = firstNewThreadId;

        // Small delay to let the DOM render the new threads
        requestAnimationFrame(() => {
          const el = document.getElementById(`thread-${firstNewThreadId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          newPageFirstThreadRef.current = null;
        });
      }
    }

    prevThreadCountRef.current = currentCount;
  }, [allThreads]);

  const handleToggleTag = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        form.setValue(
          'tags',
          selectedTags.filter((t) => t !== tag)
        );
      } else {
        form.setValue('tags', [...selectedTags, tag]);
      }
    },
    [selectedTags, form]
  );

  const handleClearTags = useCallback(() => {
    form.setValue('tags', []);
  }, [form]);

  if (error) {
    return (
      <div className="w-full max-w-md">
        <div className="max-w-2xl mx-auto px-4 pt-24">
          <div className="bg-error-background border border-error/30 rounded-xl p-4 text-center">
            <p className="text-error text-sm">Failed to load threads</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="2xl:max-w-5xl space-y-4 mx-auto overfloy-y-scroll scrollbar-hide">
      <CreateThreadFormContainer />

      <TagsFilterMobile selectedTags={selectedTags} onClick={handleToggleTag} />
      <TagsFilterDesktop
        selectedTags={selectedTags}
        onClick={handleToggleTag}
        onClear={handleClearTags}
      />

      {allThreads && (
        <div className="w-full space-y-4">
          {allThreads.map(({ threadId }) => (
            <div key={threadId} id={`thread-${threadId}`}>
              <Thread threadId={threadId} defaultOpen={false} />
            </div>
          ))}
        </div>
      )}

      {isPostFetchLoading && !data && <ThreadsFeedLoadingSkeleton />}

      {isFetchingNextPage && (
        <div className="min-h-[60vh]">
          <ThreadsFeedLoadingSkeleton />
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-20" />}

      {!hasNextPage && data?.pages && data.pages.length > 0 && (
        <div className="text-center py-8 text-text-tertiary text-xs">
          ყველა პოსტი ნანახია
        </div>
      )}
    </div>
  );
}

const ThreadsFeedLoadingSkeleton = () => {
  return (
    <div className="2xl:max-w-5xl space-y-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-surface rounded-2xl p-3 animate-pulse shadow-sm pb-20"
        >
          <div className="flex gap-3 mb-4">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-surface-container shrink-0"></div>
            <div className="flex-1 space-y-2 pt-0.5">
              <div className="h-3.5 bg-surface-container rounded-full w-1/3"></div>
              <div className="h-3 bg-surface-container rounded-full w-1/5"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-surface-container rounded-full w-3/4"></div>
            <div className="h-3 bg-surface-container rounded-full w-full"></div>
            <div className="h-3 bg-surface-container rounded-full w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
