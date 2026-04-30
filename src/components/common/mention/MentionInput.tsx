'use client';

import React, { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  filterMembersForMention,
  MentionPickerList,
} from '@/components/common/mention/MentionPickerList';
import { useMentionInput } from '@/hooks/use-mention-input';
import { useApartmentMembers } from '@/hooks/query/apartment/use-apartment-members';
import { useAuth } from '@/components/provider/AuthProvider';
import { ApartmentMemberDTO } from '@/model/dto/apartment.dto';
import { MentionDTO } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      <Textarea
        {...textareaProps}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onClick={handleSelectionChange}
        onBlur={cancel}
        onKeyDown={handleKeyDown}
        className={textareaClassName}
      />
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
