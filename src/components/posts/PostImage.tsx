import { PostImageProps } from "./types";

export function PostImage({ image }: PostImageProps) {
  return (
    <div className="w-full cursor-pointer">
      <img
        src={image}
        alt="Post image"
        className="w-full object-cover max-h-[600px]"
      />
    </div>
  );
}