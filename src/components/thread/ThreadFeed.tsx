'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@/components/provider/AuthProvider';
import { useInfiniteThreads } from '@/hooks/query/thread/use-fetch-threads';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTagsFilterSchema } from '@/components/thread/data/thread-filter-schema';
import { TagsFilterMobile } from '@/components/thread/filter/TagsFilter.mobile';
import { TagsFilterDesktop } from '@/components/thread/filter/TagsFilter.desktop';
import { CreateThreadFormContainer } from '@/components/thread/thread-form/CreateThreadForm';
import { Thread } from '@/components/thread/thread-card/Thread';
import type { ThreadFilters } from '@/components/thread/thread-filter/ThreadFilterModal';
import {
  DEFAULT_THREAD_FILTERS,
  ThreadFiltersProvider,
} from '@/components/thread/thread-filter/ThreadFiltersContext';
import { useTranslation } from '@/i18n';

export interface ThreadFeedProps {
  defaultTags?: string[];
}

export default function ThreadFeed({ defaultTags = [] }: ThreadFeedProps) {
  const { user } = useAuth();
  const t = useTranslation();
  const apartmentId = user.selectedApartmentId!;

  const TagsFilterSchema = useMemo(() => createTagsFilterSchema(t), [t]);

  const form = useForm<z.infer<typeof TagsFilterSchema>>({
    resolver: zodResolver(TagsFilterSchema),
    defaultValues: {
      tags: defaultTags,
    },
  });
  const selectedTags = useWatch({ control: form.control, name: 'tags' });

  const [filters, setFilters] = useState<ThreadFilters>(DEFAULT_THREAD_FILTERS);

  const fetchFilters = useMemo(
    () => ({
      dateFrom: filters.timeRange.from || undefined,
      dateTo: filters.timeRange.to || undefined,
      hasMedia: filters.hasMedia || undefined,
      hasPoll: filters.hasPoll || undefined,
    }),
    [filters]
  );

  const filtersContextValue = useMemo(
    () => ({ filters, setFilters }),
    [filters]
  );

  const inViewOptions = useMemo(
    () => ({
      threshold: 0.1,
      rootMargin: '512px',
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
  } = useInfiniteThreads(
    apartmentId,
    selectedTags.length > 0 ? selectedTags : null,
    fetchFilters
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allThreads = data?.pages
    ? data.pages.flatMap((page) =>
        page.content.map((threadId) => ({
          threadId,
          pageNumber: page.page.number,
        }))
      )
    : [];

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
          <div className="bg-error-background border border-error/30 urbancare-rounded-xl p-4 text-center">
            <p className="text-error urbancare-text-base">
              Failed to load threads
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThreadFiltersProvider value={filtersContextValue}>
    <div className="w-full space-y-4 mx-auto">
      <CreateThreadFormContainer />

      <TagsFilterMobile selectedTags={selectedTags} onClick={handleToggleTag} />
      <TagsFilterDesktop
        selectedTags={selectedTags}
        onClick={handleToggleTag}
        onClear={handleClearTags}
      />

      {allThreads && (
        <div className="w-full space-y-3">
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
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-20 bg" />}

      {!hasNextPage && data?.pages && data.pages.length > 0 && (
        <div className="text-center py-8 text-text-tertiary urbancare-text-sm">
          {t.thread.allPostsViewed}
        </div>
      )}
    </div>
    </ThreadFiltersProvider>
  );
}

const ThreadsFeedLoadingSkeleton = () => {
  return (
    <div className="space-y-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-surface urbancare-rounded-3xl p-4 space-y-4 animate-pulse"
        >
          <div className="flex gap-3">
            <div className="w-12 h-12 urbancare-rounded-full bg-surface-container shrink-0"></div>
            <div className="flex-1 space-y-2 pt-0.5">
              <div className="h-3.5 bg-surface-container urbancare-rounded-full w-1/3"></div>
              <div className="h-3 bg-surface-container urbancare-rounded-full w-1/5"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-surface-container urbancare-rounded-full w-3/4"></div>
            <div className="h-3 bg-surface-container urbancare-rounded-full w-full"></div>
            <div className="h-3 bg-surface-container urbancare-rounded-full w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
