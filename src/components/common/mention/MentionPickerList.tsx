'use client';

import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ApartmentMemberDTO } from '@/model/dto/apartment.dto';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { cn } from '@/lib/utils';

type Placement = 'below' | 'above';

interface AnchorRect {
  left: number;
  top: number;
  bottom: number;
  width: number;
}

const useAnchorRect = (
  anchorRef: React.RefObject<HTMLElement | null>,
  active: boolean
): AnchorRect | null => {
  const [rect, setRect] = useState<AnchorRect | null>(null);

  useLayoutEffect(() => {
    if (!active || !anchorRef.current) return;

    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({
        left: r.left,
        top: r.top,
        bottom: r.bottom,
        width: r.width,
      });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [active, anchorRef]);

  return rect;
};

interface MentionPickerListProps {
  members: ApartmentMemberDTO[];
  query: string;
  activeIndex: number;
  anchorRef: React.RefObject<HTMLElement | null>;
  placement?: Placement;
  onHover: (index: number) => void;
  onSelect: (member: ApartmentMemberDTO) => void;
  className?: string;
}

const matches = (member: ApartmentMemberDTO, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = `${member.userInfo?.name ?? ''} ${member.userInfo?.surname ?? ''}`
    .trim()
    .toLowerCase();
  return haystack.includes(needle);
};

export const filterMembersForMention = (
  members: ApartmentMemberDTO[],
  query: string,
  limit = 6
): ApartmentMemberDTO[] =>
  members.filter((m) => matches(m, query)).slice(0, limit);

export const MentionPickerList = ({
  members,
  activeIndex,
  anchorRef,
  placement = 'below',
  onHover,
  onSelect,
  className,
}: MentionPickerListProps) => {
  const rect = useAnchorRect(anchorRef, members.length > 0);

  if (
    members.length === 0 ||
    !rect ||
    typeof document === 'undefined'
  ) {
    return null;
  }

  const style: React.CSSProperties =
    placement === 'above'
      ? {
          left: rect.left,
          width: rect.width,
          bottom: window.innerHeight - rect.top + 4,
        }
      : {
          left: rect.left,
          width: rect.width,
          top: rect.bottom + 4,
        };

  return createPortal(
    <ul
      role="listbox"
      style={style}
      className={cn(
        'fixed z-50 overflow-y-auto max-h-60',
        'urbancare-rounded-xl border border-border bg-surface shadow-lg shadow-shadow/10',
        className
      )}
    >
      {members.map((member, index) => {
        const isActive = index === activeIndex;
        return (
          <li
            key={member.id}
            role="option"
            aria-selected={isActive}
            onMouseEnter={() => onHover(index)}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(member);
            }}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 cursor-pointer min-w-0',
              'transition-colors duration-100',
              isActive ? 'bg-surface-variant' : 'lg:hover:bg-surface-hover'
            )}
          >
            <UserAvatarView
              firstName={member.userInfo?.name}
              surname={member.userInfo?.surname}
              profileImageId={member.userInfo?.profileImageId}
            />
            <span className="urbancare-text-base font-medium text-text-primary truncate">
              {member.userInfo?.name} {member.userInfo?.surname}
            </span>
          </li>
        );
      })}
    </ul>,
    document.body
  );
};
