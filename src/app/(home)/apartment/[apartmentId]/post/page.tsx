import ThreadFeed from '@/components/thread/ThreadFeed';

export default function PostPage() {
  return (
    <div className="w-full h-full scrollbar-hide p-4 md:p-0">
      <ThreadFeed defaultTags={[]} />
    </div>
  );
}
