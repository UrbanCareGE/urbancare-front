import ThreadFeed from '@/components/thread/mobile/ThreadFeed';

export default function PostPage() {
  return (
    <div className={'flex flex-col w-full h-full'}>
      <ThreadFeed defaultTags={[]} />
    </div>
  );
}
