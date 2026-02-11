import ThreadFeed from '@/components/thread/mobile/ThreadFeed';
import { ThreadTagType } from '@/model/thread.dto';

export default function NewsPage() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <ThreadFeed defaultTags={[ThreadTagType.EVENT, ThreadTagType.INFO]} />
    </div>
  );
}
