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
      className="flex w-full items-center justify-center gap-2 px-4 py-1 bg-error-container text-error rounded-urbancare-panel font-medium text-urbancare-xl lg:hover:bg-error/50 lg:hover:text-error-foreground transition-colors duration-150"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="w-5 h-5" />
      {t.auth.signOut}
      {isLoggingOut && <Spinner />}
    </Button>
  );
};
