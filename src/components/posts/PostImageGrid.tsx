import { PostImageGridProps } from "./types";

function getGridColumns(imageCount: number): string {
  if (imageCount === 1) return "grid-cols-1";
  if (imageCount === 2) return "grid-cols-2";
  if (imageCount === 3) return "grid-cols-3";
  return "grid-cols-2";
}

function getImageHeight(imageCount: number, index: number): string {
  if (imageCount === 1) return "max-h-[600px]";
  if (imageCount === 2) return "h-[300px]";
  if (imageCount === 3 && index === 0) return "h-[250px]";
  return "h-[200px]";
}

function shouldSpanFullWidth(imageCount: number, index: number): boolean {
  return imageCount === 3 && index === 0;
}

interface ImageItemProps {
  src: string;
  index: number;
  totalImages: number;
}

function ImageItem({ src, index, totalImages }: ImageItemProps) {
  const isLastImageWithMore = totalImages > 4 && index === 3;
  const spanFullWidth = shouldSpanFullWidth(totalImages, index);
  const imageHeight = getImageHeight(totalImages, index);

  return (
    <div
      className={`relative cursor-pointer overflow-hidden ${
        spanFullWidth ? "col-span-3" : ""
      }`}
    >
      <img
        src={src}
        alt={`Post image ${index + 1}`}
        className={`w-full object-cover ${imageHeight}`}
      />
      {isLastImageWithMore && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-white text-3xl font-semibold">
            +{totalImages - 4}
          </span>
        </div>
      )}
    </div>
  );
}

export function PostImageGrid({ images }: PostImageGridProps) {
  if (!images || images.length === 0) return null;

  const gridColumns = getGridColumns(images.length);
  const displayImages = images.slice(0, 4);

  return (
    <div className={`w-full grid gap-0.5 ${gridColumns}`}>
      {displayImages.map((img, idx) => (
        <ImageItem
          key={idx}
          src={img}
          index={idx}
          totalImages={images.length}
        />
      ))}
    </div>
  );
}