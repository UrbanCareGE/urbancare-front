'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/provider/AuthProvider';
import { useDebounce } from '@/hooks/use-debounce';
import { useInfiniteApartments } from '@/hooks/query/apartment/use-fetch-apartments';
import Image from 'next/image';
import { getClientFileUrl } from '@/lib/api-client';

function HeroMockUI() {
  return (
    <div
      className="mt-16 relative animate-slide-up"
      style={{ animationDelay: '300ms' }}
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Card className="rounded-3xl border-border-light bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mock Thread Card */}
              <Card className="bg-surface-secondary border-border-light rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 bg-text-tertiary/20 rounded w-20 mb-1" />
                    <div className="h-2 bg-text-tertiary/10 rounded w-16" />
                  </div>
                </div>
                <div className="h-3 bg-text-tertiary/20 rounded w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 rounded w-3/4" />
              </Card>

              {/* Mock Poll Card */}
              <Card className="bg-surface-secondary border-border-light rounded-xl p-4">
                <div className="h-3 bg-primary/30 rounded w-24 mb-4" />
                <div className="space-y-2">
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                </div>
              </Card>

              {/* Mock Urgent Card */}
              <Card className="bg-surface-secondary border-border-light border-l-4 border-l-error rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-error" />
                  <div className="h-3 bg-error/30 rounded w-16" />
                </div>
                <div className="h-3 bg-text-tertiary/20 rounded w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 rounded w-2/3" />
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ApartmentSkeleton() {
  return (
    <div className="flex items-center gap-4 px-3 py-3 rounded-xl">
      <div className="w-14 h-14 rounded-xl bg-[rgb(var(--color-surface-container))] animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-[rgb(var(--color-surface-container))] rounded-lg animate-pulse w-3/4" />
        <div className="h-3 bg-[rgb(var(--color-surface-container))] rounded-lg animate-pulse w-2/5" />
      </div>
      <div className="w-4 h-4 bg-[rgb(var(--color-surface-container))] rounded animate-pulse flex-shrink-0" />
    </div>
  );
}

function SearchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  const debounce = useDebounce(query, 300);

  const { data, isLoading } = useInfiniteApartments(debounce, {
    page: 0,
    size: 15,
  });

  const allApartments = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.content.map((apartment) => ({
        ...apartment,
        pageNumber: page.page.number,
      }))
    );
  }, [data?.pages]);

  const showSkeletons = !!debounce && isLoading;
  const showEmpty = !!debounce && !isLoading && allApartments.length === 0;
  const showResults = !!debounce && !isLoading && allApartments.length > 0;
  const showInitial = !debounce;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg rounded-2xl bg-[rgb(var(--color-surface))] border-[rgb(var(--color-border))] p-0 gap-0 flex flex-col overflow-hidden shadow-2xl shadow-[rgb(var(--color-shadow)/0.2)]"
        style={{ height: 'min(560px, 90svh)' }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[rgb(var(--color-border-light))] flex-shrink-0">
          <div className="pr-8">
            <DialogTitle className="text-base font-semibold text-[rgb(var(--color-text-primary))]">
              კორპუსის ძიება
            </DialogTitle>
            <p className="text-xs text-[rgb(var(--color-text-tertiary))] mt-0.5">
              სახელის მიხედვით მოძებნე
            </p>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--color-text-tertiary))] pointer-events-none" />
            <Input
              placeholder="კორპუსის სახელი..."
              className="pl-10 h-12 rounded-xl bg-[rgb(var(--color-surface-container))] border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-tertiary))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary)/0.25)] focus-visible:border-[rgb(var(--color-border-focus))]"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable results */}
        <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide">
          {/* Initial state */}
          {showInitial && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
              <div className="w-16 h-16 rounded-2xl bg-[rgb(var(--color-primary-container))] flex items-center justify-center">
                <Search className="w-7 h-7 text-[rgb(var(--color-primary))]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  კორპუსის სახელი ჩაწერეთ
                </p>
                <p className="text-xs text-[rgb(var(--color-text-tertiary))] mt-1">
                  შედეგები ავტომატურად გამოჩნდება
                </p>
              </div>
            </div>
          )}

          {/* Skeleton loading */}
          {showSkeletons && (
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <ApartmentSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
              <div className="w-16 h-16 rounded-2xl bg-[rgb(var(--color-surface-container))] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-[rgb(var(--color-text-tertiary))]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                  კორპუსი ვერ მოიძებნა
                </p>
                <p className="text-xs text-[rgb(var(--color-text-tertiary))] mt-1">
                  სხვა სახელი სცადეთ
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <ul className="space-y-1">
              {allApartments.map((apartment) => (
                <li key={apartment.id}>
                  <Link
                    href={`/apartment/${apartment.id}/news`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[rgb(var(--color-surface-hover))] transition-colors duration-150 group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[rgb(var(--color-surface-container))] ring-1 ring-[rgb(var(--color-border-light))]">
                      <Image
                        src={getClientFileUrl(apartment.imageId)}
                        alt={apartment.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[rgb(var(--color-text-primary))] truncate leading-snug">
                        {apartment.name}
                      </p>
                      <p className="text-xs text-[rgb(var(--color-text-tertiary))] mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        <span>საცხოვრებელი კორპუსი</span>
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-[rgb(var(--color-text-tertiary))] group-hover:text-[rgb(var(--color-primary))] group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {showResults && (
          <div className="px-6 py-3 border-t border-[rgb(var(--color-border-light))] flex-shrink-0">
            <p className="text-xs text-[rgb(var(--color-text-tertiary))]">
              {allApartments.length} კორპუსი მოიძებნა
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function LandingHero() {
  const { isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section className="relative z-10 px-4 pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-slide-down">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            თქვენი ბინის მართვის პლატფორმა
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight animate-slide-up">
          მართე შენი <span className="bg-gradient-primary-text">კორპუსი</span>
          <br className="hidden md:block" />
          მარტივად
        </h1>

        <p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          ერთიანი პლატფორმა მეზობლებთან კომუნიკაციისთვის, გამოკითხვებისთვის,
          გადაუდებელი შეტყობინებებისთვის და დოკუმენტების მართვისთვის
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          {isAuthenticated ? (
            <Button
              size="lg"
              onClick={() => setSearchOpen(true)}
              className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-lg font-semibold"
            >
              დაწყება
              <Search className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Link href="/auth/register">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-lg font-semibold"
              >
                დაწყება
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-2xl border-2 border-border lg:hover:border-primary lg:hover:text-primary lg:active:scale-[0.98] transition-all duration-300 text-lg"
            >
              გაიგე მეტი
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <HeroMockUI />
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </section>
  );
}
