import React from 'react';
import { Chat } from '@/components/chat/Chat';

export default function HomePage() {
  return (
    <div className={'flex-1 flex flex-col min-h-0 p-3 lg:p-0'}>
      <Chat />
    </div>
  );
}
