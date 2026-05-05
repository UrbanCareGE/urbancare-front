'use client';

import { createContext, useContext } from 'react';
import type { ThreadFilters } from './ThreadFilterModal';
import type { ThreadSortOption } from '@/components/thread/thread-filter/ThreadSortDropDown';

interface ThreadFiltersContextValue {
  filters: ThreadFilters;
  setFilters: (filters: ThreadFilters) => void;
  sort: ThreadSortOption;
  setSort: (sort: ThreadSortOption) => void;
}

const ThreadFiltersContext = createContext<ThreadFiltersContextValue | null>(
  null
);

export const DEFAULT_THREAD_FILTERS: ThreadFilters = {
  tags: [],
  timeRange: {},
  scope: 'ALL',
  hasMedia: false,
  hasPoll: false,
};

export const DEFAULT_THREAD_SORT: ThreadSortOption = 'NEWEST';

export const ThreadFiltersProvider = ThreadFiltersContext.Provider;

export const useThreadFiltersContext = () => useContext(ThreadFiltersContext);
