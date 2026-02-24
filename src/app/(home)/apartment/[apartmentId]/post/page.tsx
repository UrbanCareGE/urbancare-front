import ThreadFeed from '@/components/thread/ThreadFeed';

export default function PostPage() {
  return (
    <div className={'w-full h-full overflow-y-scroll'}>
      <ThreadFeed defaultTags={[]} />
    </div>
  );
}
