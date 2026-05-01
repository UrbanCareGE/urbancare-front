'use client';

import { motion } from 'motion/react';
import { DoorClosed, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CurrentUserExpandable } from '@/components/home/CurrentUserExpandable';
import { NotificationDropdown } from '@/components/common/notification/NotificationDropdown';

export const ProfileIslandDesktop = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full flex items-center gap-2 justify-end"
    >
      <NotificationDropdown />
      <button
        className={cn(
          'relative w-10 h-10 urbancare-rounded-xl flex items-center justify-center flex-shrink-0',
          'bg-surface border border-border',
          'hover:bg-surface-hover hover:border-border-hover',
          'text-icon hover:text-text-primary',
          'transition-all duration-200 shadow-sm active:scale-95'
        )}
      >
        <PlusIcon className="w-4 h-4" />
      </button>
      <button
        className={cn(
          'relative w-10 h-10 urbancare-rounded-xl flex items-center justify-center flex-shrink-0',
          'bg-surface border border-border',
          'hover:bg-surface-hover hover:border-border-hover',
          'text-icon hover:text-text-primary',
          'transition-all duration-200 shadow-sm active:scale-95'
        )}
      >
        <DoorClosed className="w-4 h-4" />
      </button>

      <CurrentUserExpandable />
    </motion.div>
  );
};
