'use client';

import { createContext, useContext } from 'react';
import type { ThreadFilters } from './ThreadFilterModal';

interface ThreadFiltersContextValue {
  filters: ThreadFilters;
  setFilters: (filters: ThreadFilters) => void;
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

export const ThreadFiltersProvider = ThreadFiltersContext.Provider;

export const useThreadFiltersContext = () => useContext(ThreadFiltersContext);
