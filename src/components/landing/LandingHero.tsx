'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bell, Building2, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/provider/AuthProvider';
import { useDebounce } from '@/hooks/use-debounce';
import { useInfiniteApartments } from '@/hooks/query/apartment/use-fetch-apartments';
import Image from 'next/image';
import { getClientFileUrl } from '@/lib/api-client';
import { useTranslation } from '@/i18n';

function HeroMockUI() {
  return (
    <div
      className="mt-16 relative animate-slide-up"
      style={{ animationDelay: '300ms' }}
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Card className="urbancare-rounded-4xl border-border-light bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 urbancare-rounded-full bg-error" />
              <div className="w-3 h-3 urbancare-rounded-full bg-warning" />
              <div className="w-3 h-3 urbancare-rounded-full bg-success" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mock Thread Card */}
              <Card className="bg-surface-secondary border-border-light urbancare-rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 urbancare-rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 bg-text-tertiary/20 urbancare-rounded-sm w-20 mb-1" />
                    <div className="h-2 bg-text-tertiary/10 urbancare-rounded-sm w-16" />
                  </div>
                </div>
                <div className="h-3 bg-text-tertiary/20 urbancare-rounded-sm w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 urbancare-rounded-sm w-3/4" />
              </Card>

              {/* Mock Poll Card */}
              <Card className="bg-surface-secondary border-border-light urbancare-rounded-xl p-4">
                <div className="h-3 bg-primary/30 urbancare-rounded-sm w-24 mb-4" />
                <div className="space-y-2">
                  <div className="h-8 bg-primary/10 urbancare-rounded-lg" />
                  <div className="h-8 bg-primary/10 urbancare-rounded-lg" />
                  <div className="h-8 bg-primary/10 urbancare-rounded-lg" />
                </div>
              </Card>

              {/* Mock Urgent Card */}
              <Card className="bg-surface-secondary border-border-light border-l-4 border-l-error urbancare-rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-error" />
                  <div className="h-3 bg-error/30 urbancare-rounded-sm w-16" />
                </div>
                <div className="h-3 bg-text-tertiary/20 urbancare-rounded-sm w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 urbancare-rounded-sm w-2/3" />
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
    <div className="flex items-center gap-4 px-3 py-3 urbancare-rounded-xl">
      <div className="w-14 h-14 urbancare-rounded-xl bg-surface-container animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-surface-container urbancare-rounded-lg animate-pulse w-3/4" />
        <div className="h-3 bg-surface-container urbancare-rounded-lg animate-pulse w-2/5" />
      </div>
      <div className="w-4 h-4 bg-surface-container urbancare-rounded-sm animate-pulse flex-shrink-0" />
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
  const t = useTranslation();
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
  }, [data]);

  const showSkeletons = !!debounce && isLoading;
  const showEmpty = !!debounce && !isLoading && allApartments.length === 0;
  const showResults = !!debounce && !isLoading && allApartments.length > 0;
  const showInitial = !debounce;

  const handleJoinApartment = (apartmentId: string) => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg urbancare-rounded-3xl bg-surface border-border p-0 gap-0 flex flex-col overflow-hidden shadow-2xl shadow-shadow/20"
        style={{ height: 'min(560px, 90svh)' }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border-light flex-shrink-0">
          <div className="pr-8">
            <DialogTitle className="urbancare-text-xl font-semibold text-text-primary">
              {t.landing.buildingSearch}
            </DialogTitle>
            <p className="urbancare-text-sm text-text-tertiary mt-0.5">
              {t.landing.findByName}
            </p>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
            <Input
              placeholder={t.landing.buildingNamePlaceholder}
              className="pl-10 h-12 urbancare-rounded-xl bg-surface-container border-border text-text-primary placeholder:text-text-tertiary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-border-focus"
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
              <div className="w-16 h-16 urbancare-rounded-3xl bg-primary-container flex items-center justify-center">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="urbancare-text-base font-medium text-text-secondary">
                  {t.landing.enterBuildingName}
                </p>
                <p className="urbancare-text-sm text-text-tertiary mt-1">
                  {t.landing.resultsAutoAppear}
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
              <div className="w-16 h-16 urbancare-rounded-3xl bg-surface-container flex items-center justify-center">
                <Building2 className="w-7 h-7 text-text-tertiary" />
              </div>
              <div>
                <p className="urbancare-text-base font-medium text-text-secondary">
                  {t.landing.buildingNotFound}
                </p>
                <p className="urbancare-text-sm text-text-tertiary mt-1">
                  {t.landing.tryAnotherName}
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
                    className="flex items-center gap-4 px-3 py-3 urbancare-rounded-xl hover:bg-surface-hover transition-colors duration-150 group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 urbancare-rounded-xl overflow-hidden flex-shrink-0 bg-surface-container ring-1 ring-border-light">
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
                      <p className="urbancare-text-base font-semibold text-text-primary truncate leading-snug">
                        {apartment.name}
                      </p>
                      <p className="urbancare-text-sm text-text-tertiary mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        <span>{t.landing.residentialBuilding}</span>
                      </p>
                    </div>

                    {/* Arrow */}
                    <Button
                      onClick={() => handleJoinApartment(apartment.id)}
                      className={'bg-primary'}
                    >
                      {t.landing.joinMembership}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {showResults && (
          <div className="px-6 py-3 border-t border-border-light flex-shrink-0">
            <p className="urbancare-text-sm text-text-tertiary">
              {t.landing.buildingsFound.replace(
                '{count}',
                String(allApartments.length)
              )}
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
  const t = useTranslation();

  return (
    <section className="relative z-10 px-4 pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-slide-down">
          <span className="inline-block px-4 py-2 urbancare-rounded-full bg-primary/10 text-primary urbancare-text-base font-medium mb-6">
            {t.landing.yourPlatform}
          </span>
        </div>

        <h1 className="urbancare-text-8xl md:urbancare-text-9xl lg:urbancare-text-10xl font-bold text-text-primary mb-6 leading-tight animate-slide-up">
          {t.landing.manageYourBuilding}{' '}
          <span className="bg-gradient-primary-text">
            {t.landing.buildingHighlight}
          </span>
          <br className="hidden md:block" />
          {t.landing.simply}
        </h1>

        <p
          className="urbancare-text-2xl md:urbancare-text-3xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          {t.landing.platformDescription}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          {isAuthenticated ? (
            <Button
              size="lg"
              onClick={() => setSearchOpen(true)}
              className="w-full sm:w-auto h-14 px-8 urbancare-rounded-3xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 urbancare-text-2xl font-semibold"
            >
              {t.common.getStarted}
              <Search className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Link href="/auth/register">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 urbancare-rounded-3xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 urbancare-text-2xl font-semibold"
              >
                {t.common.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 urbancare-rounded-3xl border-2 border-border lg:hover:border-primary lg:hover:text-primary lg:active:scale-[0.98] transition-all duration-300 urbancare-text-2xl"
            >
              {t.common.learnMore}
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
