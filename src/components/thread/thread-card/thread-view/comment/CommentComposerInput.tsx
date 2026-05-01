'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  filterMembersForMention,
  MentionPickerList,
} from '@/components/common/mention/MentionPickerList';
import { useMentionInput } from '@/hooks/use-mention-input';
import { useApartmentMembers } from '@/hooks/query/apartment/use-apartment-members';
import { useAuth } from '@/components/provider/AuthProvider';
import { MentionDTO } from '@/model/dto/thread.dto';
import { MentionedText } from '@/components/common/mention/MentionedText';

const COMMENT_TEXT_STYLES: React.CSSProperties = {
  lineHeight: '20px',
  paddingTop: '10px',
  paddingBottom: '10px',
};

const COMMENT_TEXT_CLASS =
  'block w-full bg-transparent urbancare-text-base resize-none px-3.5 pr-11 ' +
  'whitespace-pre-wrap break-words';

type CommentComposerInputProps = {
  value: string;
  onChange: (value: string) => void;
  mentions: MentionDTO[];
  onMentionsChange: (next: MentionDTO[]) => void;
  onSubmit: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export const CommentComposerInput = ({
  value,
  onChange,
  mentions,
  onMentionsChange,
  onSubmit,
  placeholder,
  autoFocus,
  className,
}: CommentComposerInputProps) => {
  const hasText = value.trim().length > 0;
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const { data: members = [] } = useApartmentMembers(apartmentId);

  const {
    inputRef: mentionRef,
    handleChange,
    handleSelectionChange,
    handleMentionDeletion,
    picker,
    selectMember,
    cancel,
  } = useMentionInput({ value, onChange, mentions, onMentionsChange });

  const candidates = picker.active
    ? filterMembersForMention(members, picker.query)
    : [];
  const showPicker = picker.active && candidates.length > 0;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const sessionKey = `${picker.active}:${candidates.length}`;
  const [prevSessionKey, setPrevSessionKey] = React.useState(sessionKey);
  if (prevSessionKey !== sessionKey) {
    setPrevSessionKey(sessionKey);
    setActiveIndex(0);
  }

  const overlayRef = React.useRef<HTMLDivElement>(null);
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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (hasText) onSubmit();
    }
  };

  return (
    <div
      className={cn(
        'relative bg-surface-container urbancare-rounded-xl',
        className
      )}
    >
      <textarea
        ref={mentionRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onClick={handleSelectionChange}
        onBlur={cancel}
        placeholder={placeholder}
        rows={1}
        autoFocus={autoFocus}
        className={cn(
          COMMENT_TEXT_CLASS,
          'placeholder:text-text-tertiary outline-none',
          '[&:not(:placeholder-shown)]:[-webkit-text-fill-color:transparent]'
        )}
        style={{
          ...COMMENT_TEXT_STYLES,
          minHeight: '40px',
          maxHeight: '120px',
          caretColor: 'rgb(var(--color-text-primary))',
        }}
        onInput={(e) => {
          const t = e.target as HTMLTextAreaElement;
          t.style.height = 'auto';
          t.style.height = t.scrollHeight + 'px';
        }}
        onKeyDown={handleKeyDown}
        onScroll={syncOverlayScroll}
      />
      <div
        ref={overlayRef}
        aria-hidden
        className={cn(
          COMMENT_TEXT_CLASS,
          'absolute inset-0 pointer-events-none text-text-primary',
          'overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
        style={COMMENT_TEXT_STYLES}
      >
        <MentionedText
          content={value}
          mentions={mentions}
          mentionClassName="text-primary"
        />
        {value.endsWith('\n') && '\u200B'}
      </div>
      <button
        onClick={onSubmit}
        disabled={!hasText}
        aria-label={placeholder}
        className={cn(
          'absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 urbancare-rounded-lg',
          'flex items-center justify-center transition-all duration-150',
          hasText
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30 lg:hover:bg-primary-hover lg:active:scale-90'
            : 'bg-transparent text-text-tertiary cursor-not-allowed'
        )}
      >
        <Send className="w-4 h-4" strokeWidth={2.5} />
      </button>
      {showPicker && (
        <MentionPickerList
          members={candidates}
          query={picker.query}
          activeIndex={activeIndex}
          anchorRef={mentionRef}
          placement="above"
          onHover={setActiveIndex}
          onSelect={selectMember}
        />
      )}
    </div>
  );
};
