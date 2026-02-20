import { ThreadTagType } from '@/model/thread.dto';
import ThreadFeed from '@/components/thread/ThreadFeed';

export default function DocumentsPage() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <ThreadFeed defaultTags={[ThreadTagType.INFO]} />
    </div>
  );
}
