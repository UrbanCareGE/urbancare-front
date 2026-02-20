import { ThreadTagType } from '@/model/thread.dto';
import ThreadFeed from '@/components/thread/ThreadFeed';

export default function ServicesPage() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <ThreadFeed defaultTags={[ThreadTagType.MAINTENANCE]} />
    </div>
  );
}
