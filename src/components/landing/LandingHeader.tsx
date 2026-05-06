'use client';

import Link from 'next/link';
import { Building2, ChevronDown, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/components/provider/AuthProvider';
import { CurrentUserAvatar } from '@/components/common/avatar/UserAvatar';
import LanguageSelector from '@/components/common/util/LanguageSelector';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export function LandingHeader() {
  const { isAuthenticated, user, logOut } = useAuth();
  const t = useTranslation();

  return (
    <header className="relative z-10 px-4 py-4 md:px-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 urbancare-rounded-xl bg-gradient-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="urbancare-text-3xl font-bold text-text-primary">
            UrbanCare
          </span>
        </div>

        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 urbancare-rounded-xl cursor-pointer outline-none',
                  'bg-surface border border-transparent',
                  'lg:hover:bg-surface-hover lg:hover:border-border',
                  'shadow-sm shadow-shadow/5 transition-all duration-200'
                )}
              >
                <CurrentUserAvatar />
                <span className="hidden sm:block urbancare-text-base font-medium text-text-primary">
                  {user.name} {user.surname}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-icon transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={6}
              className={cn(
                'w-[var(--radix-popover-trigger-width)] min-w-[260px] p-0 overflow-hidden',
                'bg-surface border border-border',
                'urbancare-rounded-3xl shadow-xl shadow-shadow/10'
              )}
            >
              <div className="p-3 space-y-3">
                {user.selectedApartment && (
                  <>
                    <Link
                      href={`/apartment/${user.selectedApartment.id}`}
                      className={cn(
                        'flex items-center gap-3 p-2.5 urbancare-rounded-xl',
                        'transition-colors duration-150',
                        'lg:hover:bg-surface-container'
                      )}
                    >
                      <div className="w-9 h-9 urbancare-rounded-xl bg-primary-container/40 text-primary flex items-center justify-center shrink-0">
                        <Home className="w-4 h-4" />
                      </div>
                      <span className="flex-1 urbancare-text-base font-medium text-text-primary truncate">
                        {t.neighborhood.switchBuilding}
                      </span>
                    </Link>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-1" />
                  </>
                )}

                <div>
                  <div className="flex items-center gap-1.5 mb-2 px-1">
                    <div className="w-1.5 h-1.5 urbancare-rounded-full bg-primary shadow-sm shadow-primary/50" />
                    <p className="urbancare-text-2xs font-bold text-text-secondary uppercase tracking-widest">
                      {t.sidebar.language}
                    </p>
                  </div>
                  <LanguageSelector />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-1" />

                <Button
                  onClick={() => logOut()}
                  className="flex w-full items-center justify-center gap-2 h-11 bg-error-container text-error urbancare-rounded-xl font-semibold urbancare-text-base lg:hover:bg-error/15 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4" />
                  {t.auth.signOut}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                size="sm"
                className="urbancare-rounded-xl bg-gradient-primary"
              >
                {t.auth.signIn}
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
