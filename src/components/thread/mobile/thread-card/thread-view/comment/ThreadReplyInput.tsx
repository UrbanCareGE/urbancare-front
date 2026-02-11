import React, { useState } from 'react';
import { UserAvatar } from '@/components/common/avatar/UserAvatar';
import { UserSnapshotDTO } from '@/model/auth.dto';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { useThread } from '@/components/thread/mobile/thread-card/ThreadCard';

type ReplyInputProps = {
  commentId: string;
  userInfo: UserSnapshotDTO;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  placeholder?: string;
};

export const ReplyInput = ({
  userInfo,
  commentId,
  onSubmit,
  onCancel,
  placeholder = 'Add a reply...',
}: ReplyInputProps) => {
  const { thread } = useThread();
  const [replyText, setReplyText] = useState('');
  const { onSubmit: createReply } = useCreateComment();

  const handleSubmit = () => {
    if (replyText.trim()) {
      createReply(thread.id, { content: replyText, replyToId: commentId });
      onSubmit(replyText.trim());
      setReplyText('');
    }
  };

  return (
    <div className="flex items-start px-1 gap-3 py-2 rounded-lg">
      <UserAvatar
        firstName={userInfo.name}
        surname={userInfo.surname}
        profileImageId={userInfo.profileImageId}
      />
      <div className="flex-1">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none border-b border-slate-300 focus:border-slate-900 pb-1 transition-colors"
          rows={1}
          style={{
            minHeight: '24px',
            maxHeight: '120px',
            overflow: 'hidden',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = '24px';
            target.style.height = target.scrollHeight + 'px';
          }}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
