'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  filterMembersForMention,
  MentionPickerList,
} from '@/components/common/mention/MentionPickerList';
import { MentionedText } from '@/components/common/mention/MentionedText';
import { useMentionInput } from '@/hooks/use-mention-input';
import { useApartmentMembers } from '@/hooks/query/apartment/use-apartment-members';
import { useAuth } from '@/components/provider/AuthProvider';
import { ApartmentMemberDTO } from '@/model/dto/apartment.dto';
import { MentionDTO } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';

// Shared text-positioning classes applied identically to the textarea and the
// highlight overlay so character positions line up pixel-for-pixel.
const SHARED_TEXT_CLASS =
  'block w-full px-3 py-2 urbancare-text-xl md:urbancare-text-base ' +
  'whitespace-pre-wrap break-words leading-normal urbancare-rounded-md';

type SharedTextareaProps = Omit<
  React.ComponentProps<'textarea'>,
  'value' | 'onChange' | 'ref'
>;

interface MentionInputProps extends SharedTextareaProps {
  value: string;
  onChange: (next: string) => void;
  mentions: MentionDTO[];
  onMentionsChange: (next: MentionDTO[]) => void;
  className?: string;
  textareaClassName?: string;
}

export const MentionInput = ({
  value,
  onChange,
  mentions,
  onMentionsChange,
  className,
  textareaClassName,
  onKeyDown,
  ...textareaProps
}: MentionInputProps) => {
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const { data: members = [] } = useApartmentMembers(apartmentId);

  const {
    inputRef,
    handleChange,
    handleSelectionChange,
    handleMentionDeletion,
    picker,
    selectMember,
    cancel,
  } = useMentionInput({ value, onChange, mentions, onMentionsChange });

  const [activeIndex, setActiveIndex] = useState(0);

  const candidates = useMemo<ApartmentMemberDTO[]>(() => {
    if (!picker.active) return [];
    return filterMembersForMention(members, picker.query);
  }, [members, picker]);

  const sessionKey = `${picker.active}:${candidates.length}`;
  const [prevSessionKey, setPrevSessionKey] = useState(sessionKey);
  if (prevSessionKey !== sessionKey) {
    setPrevSessionKey(sessionKey);
    setActiveIndex(0);
  }

  const showPicker = picker.active && candidates.length > 0;

  const overlayRef = useRef<HTMLDivElement>(null);
  const syncOverlayScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = event.currentTarget.scrollTop;
      overlayRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (handleMentionDeletion(event)) return;
    if (showPicker) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % candidates.length);
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + candidates.length) % candidates.length);
        return;
      }
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        selectMember(candidates[activeIndex]);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancel();
        return;
      }
    }
    onKeyDown?.(event);
  };

  return (
    <div className={cn('relative', className)}>
      <textarea
        {...textareaProps}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onClick={handleSelectionChange}
        onBlur={cancel}
        onKeyDown={handleKeyDown}
        onScroll={syncOverlayScroll}
        style={{ caretColor: 'rgb(var(--color-text-primary))' }}
        className={cn(
          SHARED_TEXT_CLASS,
          'shadow-sm placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          textareaClassName,
          '[-webkit-text-fill-color:transparent]'
        )}
      />
      <div
        ref={overlayRef}
        aria-hidden
        className={cn(
          SHARED_TEXT_CLASS,
          'absolute inset-0 pointer-events-none border border-transparent text-text-primary',
          'overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        <MentionedText
          content={value}
          mentions={mentions}
          mentionClassName="text-primary"
        />
        {value.endsWith('\n') && '\u200B'}
      </div>
      {showPicker && (
        <MentionPickerList
          members={candidates}
          query={picker.query}
          activeIndex={activeIndex}
          anchorRef={inputRef}
          placement="below"
          onHover={setActiveIndex}
          onSelect={selectMember}
        />
      )}
    </div>
  );
};
