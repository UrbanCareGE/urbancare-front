'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';
import { OverlayPage } from '@/components/common/layouts/OverlayPage';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadViewContent } from '@/components/thread/thread-card/thread-view/ThreadViewContent';
import { ThreadViewHeader } from '@/components/thread/thread-card/thread-view/ThreadViewHeader';
import { ThreadPreviewActionSection } from '@/components/thread/thread-card/thread-preview/ThreadPreviewActionSection';
import { ThreadCommentsHeader } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentsHeader';
import { ThreadCommentGrid } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentGrid';
import { ThreadViewCommentButton } from '@/components/thread/thread-card/thread-view/comment/ThreadViewCommentButton';

export default function ThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const { user } = useAuth();
  const apartmentId = user.selectedApartment.id;
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);
  const router = useRouter();

  if (isPending || error) {
    return null;
  }

  return (
    <OverlayPage
      onClose={() => {
        router.back();
      }}
    >
      <OverlayPage.Header>
        <UrbanCareTextIcon />
      </OverlayPage.Header>

      <OverlayPage.Content>
        <ThreadCard thread={data} className="px-3">
          <ThreadCard.Header className="px-3">
            <ThreadViewHeader />
          </ThreadCard.Header>
          <ThreadCard.Body className="px-3">
            <ThreadViewContent />
          </ThreadCard.Body>
          <ThreadCard.Footer className="flex-col px-0">
            <ThreadPreviewActionSection />
          </ThreadCard.Footer>
        </ThreadCard>

        <ThreadCard thread={data} className="px-0 space-y-0">
          <ThreadCard.Header className="border-b px-3">
            <ThreadCommentsHeader />
          </ThreadCard.Header>
          <ThreadCard.Body>
            <ThreadCommentGrid />
          </ThreadCard.Body>
        </ThreadCard>
      </OverlayPage.Content>

      <OverlayPage.Footer>
        <ThreadViewCommentButton thread={data} />
      </OverlayPage.Footer>
    </OverlayPage>
  );
}
