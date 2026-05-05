'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Bookmark,
  CalendarRange,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Globe,
  Image as ImageIcon,
  SlidersHorizontal,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useResponsive } from '@/components/common/layouts/ResponsiveLayout';
import { useThreadFiltersContext } from './ThreadFiltersContext';
import { cn } from '@/lib/utils';

export interface ThreadTimeRange {
  from?: string;
  to?: string;
}
export type ThreadScope = 'ALL' | 'MINE' | 'SAVED';

export interface ThreadFilters {
  tags: string[];
  timeRange: ThreadTimeRange;
  scope: ThreadScope;
  hasMedia: boolean;
  hasPoll: boolean;
}

const DEFAULT_FILTERS: ThreadFilters = {
  tags: [],
  timeRange: {},
  scope: 'ALL',
  hasMedia: false,
  hasPoll: false,
};

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
  if (f.timeRange.from || f.timeRange.to) count++;
  if (f.scope !== 'ALL') count++;
  if (f.hasMedia) count++;
  if (f.hasPoll) count++;
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
  const ctx = useThreadFiltersContext();
  // Resolution priority: explicit props → context → internal state.
  const filters = value ?? ctx?.filters ?? internal;
  const { isDesktop } = useResponsive();
  const activeCount = countActiveFilters(filters);

  const update = (patch: Partial<ThreadFilters>) => {
    const next = { ...filters, ...patch };
    if (value !== undefined || ctx) {
      onChange?.(next);
      ctx?.setFilters(next);
    } else {
      setInternal(next);
    }
  };

  const handleDelete = () => {
    if (value !== undefined || ctx) {
      onChange?.(DEFAULT_FILTERS);
      ctx?.setFilters(DEFAULT_FILTERS);
    } else {
      setInternal(DEFAULT_FILTERS);
    }
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
      onDelete={handleDelete}
      onApply={handleApply}
      activeCount={activeCount}
      isDesktop={isDesktop}
    />
  );

  if (isDesktop) {
    return (
      <>
        {trigger}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="border-border bg-surface p-0 max-h-[88vh] max-w-xl flex flex-col overflow-hidden gap-0 urbancare-rounded-3xl shadow-2xl shadow-shadow/20">
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
          className="flex flex-col w-full bg-surface overflow-hidden p-0 gap-0 h-[88vh] rounded-t-[28px]"
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
  onDelete: () => void;
  onApply: () => void;
  activeCount: number;
  isDesktop: boolean;
}

const FilterBody = ({
  filters,
  onChange,
  onDelete,
  onApply,
  activeCount,
  isDesktop,
}: FilterBodyProps) => (
  <>
    {!isDesktop && (
      <div className="flex justify-center pt-2.5 pb-1 shrink-0" aria-hidden>
        <span className="block w-9 h-1 urbancare-rounded-full bg-text-tertiary/30" />
      </div>
    )}

    <div className="px-5 pt-4 pb-3 shrink-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-11 h-11 urbancare-rounded-2xl bg-primary-container flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-[18px] h-[18px] text-primary" />
            {activeCount > 0 && (
              <span
                className={cn(
                  'absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1',
                  'urbancare-rounded-full bg-primary text-primary-foreground',
                  'urbancare-text-xs font-bold flex items-center justify-center leading-none',
                  'ring-2 ring-surface'
                )}
              >
                {activeCount}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="urbancare-text-lg font-semibold text-text-primary leading-tight-georgian">
              ფილტრები
            </h2>
            <p className="urbancare-text-xs text-text-tertiary mt-0.5 truncate">
              {activeCount > 0
                ? `${activeCount} აქტიური ფილტრი`
                : 'დააზუსტე პოსტების ჩვენება'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDelete}
          disabled={activeCount === 0}
          className={cn(
            'flex items-center gap-1.5 h-9 px-3 urbancare-rounded-md shrink-0',
            'urbancare-text-sm font-medium',
            'transition-colors duration-150',
            activeCount === 0
              ? 'text-text-tertiary opacity-40 pointer-events-none'
              : 'text-error lg:hover:bg-error/10'
          )}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>წაშლა</span>
        </button>
      </div>

      {activeCount > 0 && (
        <ActiveFilterPills filters={filters} onChange={onChange} />
      )}
    </div>

    <div className="h-px bg-border/60 mx-5 shrink-0" />

    <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-6 scrollbar-hide">
      <FilterSection title="პერიოდი" icon={CalendarRange}>
        <DateRangeField
          from={filters.timeRange.from ?? ''}
          to={filters.timeRange.to ?? ''}
          onChange={(next) => onChange({ timeRange: next })}
        />
      </FilterSection>

      <FilterSection title="ფარგლები" icon={Filter}>
        <div className="urbancare-rounded-2xl bg-surface-container/60 p-1.5 space-y-1">
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

      <FilterSection title="კონტენტი" icon={FileText}>
        <div className="urbancare-rounded-2xl bg-surface-container/60 p-1.5 space-y-1">
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
        </div>
      </FilterSection>
    </div>

    <div className="border-t border-border bg-surface px-5 py-3.5 shrink-0">
      <Button
        type="button"
        onClick={onApply}
        className={cn(
          'w-full h-12 font-semibold',
          'shadow-md shadow-primary/15',
          'lg:hover:shadow-lg lg:hover:shadow-primary/20'
        )}
      >
        <Check className="w-[18px] h-[18px]" strokeWidth={2.5} />
        <span>გამოყენება</span>
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 urbancare-rounded-full bg-primary-foreground/20 urbancare-text-xs font-bold leading-none">
            {activeCount}
          </span>
        )}
      </Button>
    </div>
  </>
);

const FilterSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <section>
    <h3 className="flex items-center gap-1.5 urbancare-text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2.5">
      <Icon className="w-3.5 h-3.5" />
      {title}
    </h3>
    {children}
  </section>
);

const SCOPE_LABELS: Record<ThreadScope, string> = {
  ALL: 'ყველა პოსტი',
  MINE: 'ჩემი პოსტები',
  SAVED: 'შენახული',
};

interface ActiveFilterPillsProps {
  filters: ThreadFilters;
  onChange: (patch: Partial<ThreadFilters>) => void;
}

const ActiveFilterPills = ({ filters, onChange }: ActiveFilterPillsProps) => {
  const pills: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.timeRange.from || filters.timeRange.to) {
    const from = filters.timeRange.from ? formatDate(filters.timeRange.from) : '…';
    const to = filters.timeRange.to ? formatDate(filters.timeRange.to) : '…';
    pills.push({
      key: 'timeRange',
      label: `${from} — ${to}`,
      onRemove: () => onChange({ timeRange: {} }),
    });
  }
  if (filters.scope !== 'ALL') {
    pills.push({
      key: 'scope',
      label: SCOPE_LABELS[filters.scope],
      onRemove: () => onChange({ scope: 'ALL' }),
    });
  }
  if (filters.hasMedia) {
    pills.push({
      key: 'hasMedia',
      label: 'მედიით',
      onRemove: () => onChange({ hasMedia: false }),
    });
  }
  if (filters.hasPoll) {
    pills.push({
      key: 'hasPoll',
      label: 'გამოკითხვა',
      onRemove: () => onChange({ hasPoll: false }),
    });
  }

  return (
    <div className="flex items-center gap-1.5 mt-3 -mx-1 px-1 overflow-x-auto scrollbar-hide">
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={pill.onRemove}
          className={cn(
            'group inline-flex items-center gap-1.5 h-7 pl-2.5 pr-1.5 shrink-0',
            'urbancare-rounded-full bg-primary-container/60 text-primary',
            'urbancare-text-xs font-medium',
            'transition-colors duration-150',
            'lg:hover:bg-primary-container'
          )}
        >
          <span className="truncate max-w-[200px]">{pill.label}</span>
          <span className="flex items-center justify-center w-4 h-4 urbancare-rounded-full bg-primary/15 lg:group-hover:bg-primary/25">
            <X className="w-2.5 h-2.5" strokeWidth={3} />
          </span>
        </button>
      ))}
    </div>
  );
};

const formatDate = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

interface DateRangeFieldProps {
  from: string;
  to: string;
  onChange: (range: { from?: string; to?: string }) => void;
}

const DateRangeField = ({ from, to, onChange }: DateRangeFieldProps) => {
  const hasValue = !!from || !!to;
  return (
    <div className="urbancare-rounded-2xl bg-surface-container overflow-hidden">
      <div className="flex items-stretch">
        <DateCell
          label="დან"
          value={from}
          max={to || undefined}
          onChange={(next) => onChange({ from: next || undefined, to: to || undefined })}
        />
        <div className="w-px bg-surface" aria-hidden />
        <DateCell
          label="მდე"
          value={to}
          min={from || undefined}
          onChange={(next) => onChange({ from: from || undefined, to: next || undefined })}
        />
      </div>
      {hasValue && (
        <button
          type="button"
          onClick={() => onChange({ from: undefined, to: undefined })}
          className={cn(
            'flex items-center justify-center gap-1.5 w-full py-2',
            'border-t border-surface',
            'urbancare-text-xs font-medium text-text-secondary',
            'transition-colors duration-150',
            'lg:hover:bg-surface-container-high lg:hover:text-text-primary'
          )}
        >
          <X className="w-3.5 h-3.5" />
          გასუფთავება
        </button>
      )}
    </div>
  );
};

interface DateCellProps {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
}

const DateCell = ({ label, value, min, max, onChange }: DateCellProps) => {
  const [open, setOpen] = useState(false);
  const filled = !!value;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex-1 flex items-center gap-3 px-3.5 py-2.5 text-left cursor-pointer',
            'transition-colors duration-150',
            'lg:hover:bg-surface-container-high',
            'data-[state=open]:bg-surface-container-high'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center w-9 h-9 urbancare-rounded-xl shrink-0',
              'transition-colors duration-150',
              filled
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-tertiary'
            )}
          >
            <CalendarRange className="w-[18px] h-[18px]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="urbancare-text-xs font-semibold uppercase tracking-wider text-text-tertiary leading-tight">
              {label}
            </span>
            <span
              className={cn(
                'urbancare-text-sm font-medium leading-tight mt-0.5 truncate',
                filled ? 'text-text-primary' : 'text-text-tertiary'
              )}
            >
              {filled ? formatDate(value) : 'აირჩიე'}
            </span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-auto p-0 border-border bg-surface urbancare-rounded-3xl shadow-2xl shadow-shadow/20"
      >
        <Calendar
          value={value}
          min={min}
          max={max}
          onSelect={(iso) => {
            onChange(iso);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

// ---------- Calendar ----------

const toIso = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const fromIso = (iso: string): Date | null => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getMonthGrid = (month: Date): Date[] => {
  const first = startOfMonth(month);
  // Make grid Monday-first: getDay() returns 0=Sun, so shift.
  const firstWeekday = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(start.getDate() - firstWeekday);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
};

interface CalendarProps {
  value: string;
  min?: string;
  max?: string;
  onSelect: (iso: string) => void;
}

const Calendar = ({ value, min, max, onSelect }: CalendarProps) => {
  const today = startOfDay(new Date());
  const selected = fromIso(value);
  const minDate = min ? fromIso(min) : null;
  const maxDate = max ? fromIso(max) : null;

  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(selected ?? today)
  );

  const grid = getMonthGrid(viewMonth);
  const monthLabel = viewMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  // Day-of-week headers, Monday-first, in current locale.
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const ref = new Date(2024, 0, 1 + i); // 2024-01-01 is a Monday
    return ref.toLocaleDateString(undefined, { weekday: 'narrow' });
  });

  const goPrev = () =>
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const goNext = () =>
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  const goToday = () => {
    setViewMonth(startOfMonth(today));
    onSelect(toIso(today));
  };

  return (
    <div className="w-[300px] p-3">
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={goPrev}
          className={cn(
            'flex items-center justify-center w-8 h-8 urbancare-rounded-full',
            'text-icon transition-colors duration-150',
            'lg:hover:bg-surface-container lg:hover:text-text-primary',
            'active:scale-90'
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>
        <span className="urbancare-text-sm font-semibold text-text-primary capitalize leading-tight-georgian">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={goNext}
          className={cn(
            'flex items-center justify-center w-8 h-8 urbancare-rounded-full',
            'text-icon transition-colors duration-150',
            'lg:hover:bg-surface-container lg:hover:text-text-primary',
            'active:scale-90'
          )}
          aria-label="Next month"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1 px-0.5">
        {dayLabels.map((label, i) => (
          <div
            key={i}
            className="urbancare-text-xs font-semibold text-text-tertiary text-center py-1.5 uppercase tracking-wider"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 px-0.5">
        {grid.map((d) => {
          const inMonth = d.getMonth() === viewMonth.getMonth();
          const isSelected = selected ? isSameDay(d, selected) : false;
          const isToday = isSameDay(d, today);
          const disabled =
            (!!minDate && d < minDate) || (!!maxDate && d > maxDate);

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(toIso(d))}
              className={cn(
                'relative h-9 w-full urbancare-rounded-xl',
                'urbancare-text-sm font-medium',
                'transition-all duration-150 active:scale-90',
                'disabled:cursor-not-allowed disabled:opacity-30',
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : inMonth
                    ? 'text-text-primary lg:hover:bg-surface-container'
                    : 'text-text-tertiary/60 lg:hover:bg-surface-container/60',
                !isSelected &&
                  isToday &&
                  'ring-1 ring-inset ring-primary/40 text-primary'
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-border/60">
        <button
          type="button"
          onClick={goToday}
          className={cn(
            'urbancare-text-xs font-medium text-primary px-2 h-7 urbancare-rounded-full',
            'transition-colors duration-150 lg:hover:bg-primary-container/50'
          )}
        >
          დღეს
        </button>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect('')}
            className={cn(
              'flex items-center gap-1 urbancare-text-xs font-medium text-text-secondary px-2 h-7 urbancare-rounded-full',
              'transition-colors duration-150 lg:hover:bg-surface-container lg:hover:text-text-primary'
            )}
          >
            <X className="w-3 h-3" />
            გასუფთავება
          </button>
        )}
      </div>
    </div>
  );
};

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
