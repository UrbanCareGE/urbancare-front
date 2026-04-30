import { MentionDTO } from '@/model/dto/thread.dto';

const commonPrefixLength = (a: string, b: string): number => {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a[i] === b[i]) i++;
  return i;
};

const commonSuffixLength = (a: string, b: string): number => {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a[a.length - 1 - i] === b[b.length - 1 - i]) i++;
  return i;
};

/**
 * Re-aligns mentions after the underlying text changes.
 * Mentions whose covered range was edited are dropped; ranges
 * outside the edit window are shifted by the length delta.
 */
export const adjustMentions = (
  oldText: string,
  newText: string,
  mentions: MentionDTO[] | undefined
): MentionDTO[] => {
  if (!mentions || oldText === newText || mentions.length === 0) {
    return mentions ?? [];
  }

  const prefix = commonPrefixLength(oldText, newText);
  const suffix = commonSuffixLength(
    oldText.slice(prefix),
    newText.slice(prefix)
  );
  const oldEnd = oldText.length - suffix;
  const delta = newText.length - oldText.length;

  return mentions.flatMap((m) => {
    if (m.toIndex <= prefix) return [m];
    if (m.fromIndex >= oldEnd) {
      return [
        { ...m, fromIndex: m.fromIndex + delta, toIndex: m.toIndex + delta },
      ];
    }
    return [];
  });
};

const MENTION_TRIGGER_PATTERN = /(^|\s)@([^\s\n@]*)$/;

/**
 * Locates an active mention trigger ending at `cursor`.
 * Returns the @-position and current query, or null if not in a mention.
 */
export const findMentionTrigger = (
  text: string,
  cursor: number
): { mentionStart: number; query: string } | null => {
  const before = text.slice(0, cursor);
  const match = before.match(MENTION_TRIGGER_PATTERN);
  if (!match) return null;
  const query = match[2] ?? '';
  const mentionStart = before.length - query.length - 1;
  return { mentionStart, query };
};

/** Splits content into ranges aligned to mentions (sorted, non-overlapping). */
export const sliceContentByMentions = (
  content: string,
  mentions: MentionDTO[]
): Array<{ kind: 'text'; text: string } | { kind: 'mention'; mention: MentionDTO; text: string }> => {
  if (mentions.length === 0) {
    return content ? [{ kind: 'text', text: content }] : [];
  }

  const sorted = [...mentions].sort((a, b) => a.fromIndex - b.fromIndex);
  const segments: ReturnType<typeof sliceContentByMentions> = [];
  let cursor = 0;

  for (const mention of sorted) {
    const { fromIndex, toIndex } = mention;
    if (fromIndex < cursor || toIndex > content.length || toIndex <= fromIndex) {
      continue;
    }
    if (fromIndex > cursor) {
      segments.push({ kind: 'text', text: content.slice(cursor, fromIndex) });
    }
    segments.push({
      kind: 'mention',
      mention,
      text: content.slice(fromIndex, toIndex),
    });
    cursor = toIndex;
  }

  if (cursor < content.length) {
    segments.push({ kind: 'text', text: content.slice(cursor) });
  }

  return segments;
};
