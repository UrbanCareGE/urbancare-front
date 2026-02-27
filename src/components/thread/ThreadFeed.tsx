'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/components/provider/AuthProvider';
import { useInfiniteThreads } from '@/hooks/query/thread/use-fetch-threads';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TagsFilterSchema } from '@/components/thread/data/thread-filter-schema';
import { TagsFilterMobile } from '@/components/thread/filter/TagsFilter.mobile';
import { CreateThreadFormContainer } from '@/components/thread/thread-form/CreateThreadForm';
import { Thread } from '@/components/thread/thread-card/Thread';

export interface ThreadFeedProps {
  defaultTags?: string[];
}

export default function ThreadFeed({ defaultTags = [] }: ThreadFeedProps) {
  const { user } = useAuth();
  const apartmentId = user.selectedApartmentId;

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

  if (error) {
    return (
      <div className="w-full max-w-md">
        <div className="max-w-2xl mx-auto px-4 pt-24">
          <div className="bg-[rgb(var(--color-error-background))] border border-[rgb(var(--color-error)/0.3)] rounded-xl p-4 text-center">
            <p className="text-[rgb(var(--color-error))] text-sm">
              Failed to load threads
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="2xl:max-w-5xl space-y-4 mx-auto">
      <CreateThreadFormContainer />

      <TagsFilterMobile
        selectedTags={selectedTags}
        onClick={handleToggleTag}
        className={'desktop:block'}
      />

      {allThreads && (
        <div className="w-full space-y-4">
          {allThreads.map(({ threadId }) => (
            <Thread key={threadId} threadId={threadId} defaultOpen={false} />
          ))}
        </div>
      )}

      {isPostFetchLoading && !data && <ThreadsFeedLoadingSkeleton />}

      {isFetchingNextPage && <ThreadsFeedLoadingSkeleton />}
      {hasNextPage && <div ref={ref} className="h-20" />}

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
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-surface rounded-2xl p-4 animate-pulse shadow-sm"
        >
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-surface-container shrink-0"></div>
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
