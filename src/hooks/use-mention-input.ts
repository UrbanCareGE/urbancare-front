'use client';

import { useCallback, useRef, useState } from 'react';
import {
  adjustMentions,
  findMentionTrigger,
} from '@/lib/mentions';
import { ApartmentMemberDTO } from '@/model/dto/apartment.dto';
import { MentionDTO } from '@/model/dto/thread.dto';

const buildMentionLabel = (member: ApartmentMemberDTO): string => {
  const name = member.userInfo?.name ?? '';
  const surname = member.userInfo?.surname ?? '';
  return `@${[name, surname].filter(Boolean).join(' ').trim() || 'user'}`;
};

interface UseMentionInputArgs {
  value: string;
  onChange: (next: string) => void;
  mentions: MentionDTO[];
  onMentionsChange: (next: MentionDTO[]) => void;
}

interface UseMentionInputResult {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectionChange: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  picker:
    | { active: false }
    | { active: true; query: string };
  selectMember: (member: ApartmentMemberDTO) => void;
  cancel: () => void;
}

export function useMentionInput({
  value,
  onChange,
  mentions,
  onMentionsChange,
}: UseMentionInputArgs): UseMentionInputResult {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [trigger, setTrigger] = useState<{
    mentionStart: number;
    query: string;
  } | null>(null);

  const recomputeTrigger = useCallback((text: string, cursor: number) => {
    setTrigger(findMentionTrigger(text, cursor));
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      const cursor = event.target.selectionStart ?? nextValue.length;

      onMentionsChange(adjustMentions(value, nextValue, mentions));
      onChange(nextValue);
      recomputeTrigger(nextValue, cursor);
    },
    [value, mentions, onChange, onMentionsChange, recomputeTrigger]
  );

  const handleSelectionChange = useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const target = event.currentTarget;
      recomputeTrigger(target.value, target.selectionStart ?? 0);
    },
    [recomputeTrigger]
  );

  const selectMember = useCallback(
    (member: ApartmentMemberDTO) => {
      const input = inputRef.current;
      if (!input || !trigger) return;

      const cursor = input.selectionStart ?? value.length;
      const label = buildMentionLabel(member);
      const before = value.slice(0, trigger.mentionStart);
      const after = value.slice(cursor);
      const insertion = `${label} `;
      const nextValue = `${before}${insertion}${after}`;

      const adjusted = adjustMentions(value, nextValue, mentions);
      const newMention: MentionDTO = {
        userId: member.userId,
        fromIndex: trigger.mentionStart,
        toIndex: trigger.mentionStart + label.length,
      };

      onMentionsChange([...adjusted, newMention]);
      onChange(nextValue);
      setTrigger(null);

      requestAnimationFrame(() => {
        const next = inputRef.current;
        if (!next) return;
        const newCursor = trigger.mentionStart + insertion.length;
        next.focus();
        next.setSelectionRange(newCursor, newCursor);
      });
    },
    [trigger, value, mentions, onChange, onMentionsChange]
  );

  const cancel = useCallback(() => setTrigger(null), []);

  return {
    inputRef,
    handleChange,
    handleSelectionChange,
    picker: trigger ? { active: true, query: trigger.query } : { active: false },
    selectMember,
    cancel,
  };
}
