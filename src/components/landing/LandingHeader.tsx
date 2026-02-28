'use client';

import Link from 'next/link';
import { Building2, ChevronDown, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/provider/AuthProvider';
import { UserAvatar } from '@/components/common/avatar/UserAvatar';

export function LandingHeader() {
  const { isAuthenticated, user, logOut } = useAuth();

  return (
    <header className="relative z-10 px-4 py-4 md:px-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">UrbanCare</span>
        </div>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl px-3 py-2 lg:hover:bg-surface-secondary transition-colors outline-none cursor-pointer">
                <UserAvatar
                  firstName={user.name}
                  surname={user.surname}
                  profileImageId={user.profileImageId}
                />
                <span className="hidden sm:block text-sm font-medium text-text-primary">
                  {user.name} {user.surname}
                </span>
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {user.selectedApartment && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/apartment/${user.selectedApartment.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Home className="w-4 h-4" />
                      კორპუსში გადასვლა
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                onClick={() => logOut()}
                className="text-error focus:text-error cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                გასვლა
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary lg:hover:text-primary"
              >
                შესვლა
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="rounded-xl bg-gradient-primary">
                რეგისტრაცია
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
