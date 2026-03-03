'use client';

import { Pencil } from 'lucide-react';
import React from 'react';

export const ThreadEditButton = () => {
  return (
    <button className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-lg lg:hover:bg-surface-container transition-colors duration-150">
      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
        <Pencil className="w-4 h-4 text-icon" />
      </div>
      <span className="font-medium text-text-primary">რედაქტირება</span>
    </button>
  );
};
