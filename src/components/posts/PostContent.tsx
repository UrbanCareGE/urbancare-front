import { PostContentProps } from "./types";

export function PostContent({ content }: PostContentProps) {
  if (!content) return null;

  return (
    <div className="px-4 pb-3">
      <p className="text-sm leading-5 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}