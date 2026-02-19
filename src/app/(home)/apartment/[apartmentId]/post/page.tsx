import ThreadFeed from '@/components/thread/ThreadFeed';

export default function PostPage() {
  return (
    <div className={'flex flex-col h-full'}>
      <ThreadFeed defaultTags={[]} />
    </div>
  );
}
