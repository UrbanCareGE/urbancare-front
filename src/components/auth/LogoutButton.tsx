'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';
import { useTranslation } from '@/i18n';

export const LogoutButton = () => {
  const { logOut, isLoggingOut } = useAuth();
  const t = useTranslation();

  const handleLogout = () => {
    logOut();
  };
  return (
    <Button
      className="flex w-full items-center justify-center gap-2 h-11 bg-error-container text-error urbancare-rounded-xl font-semibold urbancare-text-base lg:hover:bg-error/15 transition-colors duration-150"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="w-4 h-4" />
      {t.auth.signOut}
      {isLoggingOut && <Spinner />}
    </Button>
  );
};
