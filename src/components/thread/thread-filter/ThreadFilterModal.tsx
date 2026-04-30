'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Bookmark,
  Eye,
  Globe,
  Image as ImageIcon,
  MessageSquare,
  RotateCcw,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useResponsive } from '@/components/common/layouts/ResponsiveLayout';
import { cn } from '@/lib/utils';

export type ThreadTimeRange = 'TODAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL';
export type ThreadScope = 'ALL' | 'MINE' | 'SAVED';

export interface ThreadFilters {
  timeRange: ThreadTimeRange;
  scope: ThreadScope;
  hasMedia: boolean;
  hasPoll: boolean;
  hasComments: boolean;
  unreadOnly: boolean;
}

const DEFAULT_FILTERS: ThreadFilters = {
  timeRange: 'ALL',
  scope: 'ALL',
  hasMedia: false,
  hasPoll: false,
  hasComments: false,
  unreadOnly: false,
};

const TIME_RANGES: { value: ThreadTimeRange; label: string }[] = [
  { value: 'TODAY', label: 'დღეს' },
  { value: 'WEEK', label: 'ეს კვირა' },
  { value: 'MONTH', label: 'ეს თვე' },
  { value: 'YEAR', label: 'ეს წელი' },
  { value: 'ALL', label: 'ყველა' },
];

interface ScopeMeta {
  value: ThreadScope;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SCOPES: ScopeMeta[] = [
  { value: 'ALL', label: 'ყველა პოსტი', icon: Globe },
  { value: 'MINE', label: 'ჩემი პოსტები', icon: User },
  { value: 'SAVED', label: 'შენახული', icon: Bookmark },
];

const countActiveFilters = (f: ThreadFilters) => {
  let count = 0;
  if (f.timeRange !== 'ALL') count++;
  if (f.scope !== 'ALL') count++;
  if (f.hasMedia) count++;
  if (f.hasPoll) count++;
  if (f.hasComments) count++;
  if (f.unreadOnly) count++;
  return count;
};

interface ThreadFilterModalProps {
  value?: ThreadFilters;
  onChange?: (value: ThreadFilters) => void;
  className?: string;
}

export const ThreadFilterModal = ({
  value,
  onChange,
  className,
}: ThreadFilterModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internal, setInternal] = useState<ThreadFilters>(DEFAULT_FILTERS);
  const filters = value ?? internal;
  const { isDesktop } = useResponsive();
  const activeCount = countActiveFilters(filters);

  const update = (patch: Partial<ThreadFilters>) => {
    const next = { ...filters, ...patch };
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleReset = () => {
    if (value === undefined) setInternal(DEFAULT_FILTERS);
    onChange?.(DEFAULT_FILTERS);
  };

  const handleApply = () => {
    onChange?.(filters);
    setIsOpen(false);
  };

  const trigger = (
    <button
      type="button"
      aria-label="Filter threads"
      onClick={() => setIsOpen(true)}
      className={cn(
        'group relative inline-flex items-center justify-center w-8 h-8 shrink-0',
        'urbancare-rounded-full text-icon',
        'transition-all duration-200',
        'lg:hover:bg-surface-container lg:hover:text-text-primary',
        'active:scale-90',
        isOpen && 'bg-primary-container text-primary',
        className
      )}
    >
      <SlidersHorizontal className="w-[18px] h-[18px]" />
      {activeCount > 0 && (
        <span
          className={cn(
            'absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1',
            'urbancare-rounded-full bg-primary text-primary-foreground',
            'urbancare-text-xs font-semibold flex items-center justify-center leading-none',
            'ring-2 ring-surface'
          )}
        >
          {activeCount}
        </span>
      )}
    </button>
  );

  const body = (
    <FilterBody
      filters={filters}
      onChange={update}
      onReset={handleReset}
      onApply={handleApply}
      activeCount={activeCount}
    />
  );

  if (isDesktop) {
    return (
      <>
        {trigger}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="border-border bg-surface p-0 max-h-[85vh] max-w-md flex flex-col overflow-hidden gap-0">
            <DialogTitle className="sr-only">ფილტრები</DialogTitle>
            {body}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      {trigger}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="flex flex-col w-full bg-surface overflow-hidden p-0 gap-0 h-[88vh]"
        >
          <SheetTitle className="sr-only">ფილტრები</SheetTitle>
          {body}
        </SheetContent>
      </Sheet>
    </>
  );
};

interface FilterBodyProps {
  filters: ThreadFilters;
  onChange: (patch: Partial<ThreadFilters>) => void;
  onReset: () => void;
  onApply: () => void;
  activeCount: number;
}

const FilterBody = ({
  filters,
  onChange,
  onReset,
  onApply,
  activeCount,
}: FilterBodyProps) => (
  <>
    <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 urbancare-rounded-xl bg-primary-container flex items-center justify-center shrink-0">
          <SlidersHorizontal className="w-[18px] h-[18px] text-primary" />
        </div>
        <div>
          <h2 className="urbancare-text-lg font-semibold text-text-primary leading-tight">
            ფილტრები
          </h2>
          <p className="urbancare-text-xs text-text-tertiary mt-0.5">
            {activeCount > 0
              ? `${activeCount} აქტიური ფილტრი`
              : 'დააზუსტე პოსტების ჩვენება'}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        disabled={activeCount === 0}
        className={cn(
          'flex items-center gap-1.5 h-8 px-3 urbancare-rounded-full',
          'urbancare-text-sm font-medium',
          'transition-colors duration-150',
          activeCount === 0
            ? 'text-text-tertiary opacity-40 pointer-events-none'
            : 'text-text-secondary lg:hover:bg-surface-container lg:hover:text-text-primary'
        )}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>გადატვირთვა</span>
      </button>
    </div>

    <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3 space-y-6 scrollbar-hide">
      <FilterSection title="პერიოდი">
        <div className="flex flex-wrap gap-2">
          {TIME_RANGES.map((tr) => (
            <Chip
              key={tr.value}
              active={filters.timeRange === tr.value}
              onClick={() => onChange({ timeRange: tr.value })}
              label={tr.label}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="ფარგლები">
        <div className="space-y-1.5">
          {SCOPES.map((scope) => (
            <RadioRow
              key={scope.value}
              icon={scope.icon}
              label={scope.label}
              active={filters.scope === scope.value}
              onClick={() => onChange({ scope: scope.value })}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="კონტენტი">
        <div className="space-y-1.5">
          <ToggleRow
            icon={ImageIcon}
            label="მედიით"
            description="პოსტები ფოტო ან ვიდეოთი"
            active={filters.hasMedia}
            onClick={() => onChange({ hasMedia: !filters.hasMedia })}
          />
          <ToggleRow
            icon={BarChart3}
            label="გამოკითხვა"
            description="პოსტები გამოკითხვით"
            active={filters.hasPoll}
            onClick={() => onChange({ hasPoll: !filters.hasPoll })}
          />
          <ToggleRow
            icon={MessageSquare}
            label="კომენტარებით"
            description="აქტიური განხილვები"
            active={filters.hasComments}
            onClick={() => onChange({ hasComments: !filters.hasComments })}
          />
          <ToggleRow
            icon={Eye}
            label="მხოლოდ წაუკითხავი"
            description="ახალი, შენთვის უცნობი პოსტები"
            active={filters.unreadOnly}
            onClick={() => onChange({ unreadOnly: !filters.unreadOnly })}
          />
        </div>
      </FilterSection>
    </div>

    <div className="border-t border-border px-5 py-3 shrink-0">
      <button
        type="button"
        onClick={onApply}
        className={cn(
          'w-full h-11 urbancare-rounded-full',
          'bg-primary text-primary-foreground',
          'urbancare-text-base font-semibold',
          'transition-all duration-150',
          'lg:hover:opacity-90 active:scale-[0.99]'
        )}
      >
        გამოყენება
      </button>
    </div>
  </>
);

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h3 className="urbancare-text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2.5">
      {title}
    </h3>
    {children}
  </section>
);

interface ChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const Chip = ({ active, onClick, label }: ChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'h-9 px-3.5 urbancare-rounded-full urbancare-text-sm font-medium',
      'transition-all duration-150 active:scale-95',
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-surface-container text-text-secondary lg:hover:bg-surface-container-high lg:hover:text-text-primary'
    )}
  >
    {label}
  </button>
);

interface RadioRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const RadioRow = ({ icon: Icon, label, active, onClick }: RadioRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-3 p-2.5 urbancare-rounded-xl',
      'transition-colors duration-150',
      active ? 'bg-primary-container/40' : 'lg:hover:bg-surface-container'
    )}
  >
    <div
      className={cn(
        'w-9 h-9 urbancare-rounded-xl flex items-center justify-center shrink-0',
        'transition-colors duration-150',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-surface-container text-icon'
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
    <span
      className={cn(
        'flex-1 urbancare-text-base font-medium text-left truncate',
        active ? 'text-primary' : 'text-text-primary'
      )}
    >
      {label}
    </span>
    <span
      className={cn(
        'relative w-5 h-5 urbancare-rounded-full border-2 shrink-0 transition-colors duration-150',
        active ? 'border-primary bg-primary' : 'border-border'
      )}
    >
      {active && (
        <span className="absolute inset-0 m-auto w-1.5 h-1.5 urbancare-rounded-full bg-primary-foreground" />
      )}
    </span>
  </button>
);

interface ToggleRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

const ToggleRow = ({
  icon: Icon,
  label,
  description,
  active,
  onClick,
}: ToggleRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-3 p-2.5 urbancare-rounded-xl',
      'transition-colors duration-150 lg:hover:bg-surface-container'
    )}
  >
    <div
      className={cn(
        'w-9 h-9 urbancare-rounded-xl flex items-center justify-center shrink-0',
        'transition-colors duration-150',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-surface-container text-icon'
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0 text-left">
      <p className="urbancare-text-base font-medium text-text-primary leading-tight truncate">
        {label}
      </p>
      <p className="urbancare-text-xs text-text-tertiary truncate mt-0.5">
        {description}
      </p>
    </div>
    <span
      className={cn(
        'relative inline-flex items-center w-11 h-6 urbancare-rounded-full shrink-0 p-0.5',
        'transition-colors duration-200',
        active ? 'bg-primary' : 'bg-surface-container-high'
      )}
    >
      <span
        className={cn(
          'block w-5 h-5 urbancare-rounded-full bg-surface shadow-md',
          'transition-transform duration-200 ease-out',
          active ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </span>
  </button>
);
