import { ThreadTagType } from '@/model/dto/thread.dto';
import ThreadFeed from '@/components/thread/ThreadFeed';

export default function AnnouncementsPage() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <ThreadFeed defaultTags={[ThreadTagType.ANNOUNCEMENT]} />
    </div>
  );
}
