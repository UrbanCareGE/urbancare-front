'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ACCEPTED_IMAGE_TYPES } from '@/components/thread/data/create-thread-schema';

export interface MediaItem {
  url: string;
  type: string;
}

interface ThreadImagePreviewProps {
  className?: string;
  mediaItems: MediaItem[];
}

function MediaGridThumb({
                          item,
                          isDimmedWithCount,
                          remainingCount,
                          className,
                          onClick,
                        }: {
  item: MediaItem;
  isDimmedWithCount?: boolean;
  remainingCount?: number;
  className?: string;
  onClick: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {

    const resetContent = () => {
      setImageLoaded(false);
      setVideoLoaded(false);
    };

    resetContent();

  }, [item.url]);

  const isImage = item.type.startsWith('image');
  const isVideo = item.type.startsWith('video');

  return (
    <div
      className={cn(
        'relative overflow-hidden cursor-pointer bg-black/5',
        className,
      )}
      onClick={onClick}
    >
      {isImage && (
        <>
          {!imageLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src={item.url}
            fill
            alt=""
            className={cn(
              'object-cover transition-opacity',
              isDimmedWithCount && 'brightness-50 blur-xs',
              imageLoaded ? 'opacity-100' : 'opacity-0',
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </>
      )}

      {isVideo && (
        <>
          {!videoLoaded && <Skeleton className="absolute inset-0" />}
          <video
            src={item.url}
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={() => setVideoLoaded(true)}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity',
              videoLoaded ? 'opacity-100' : 'opacity-0',
              isDimmedWithCount && 'brightness-50 blur-xs',
            )}
          />
          {!isDimmedWithCount && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="bg-black/60 rounded-urbancare-full p-3">
                <Play className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          )}
        </>
      )}


      {isDimmedWithCount && remainingCount && remainingCount > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white text-urbancare-7xl font-semibold">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}

function CarouselMedia({
                         item,
                         isActive,
                       }: {
  item: MediaItem;
  isActive: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (ACCEPTED_IMAGE_TYPES.includes(item.type)) {
    return (
      <div className="relative w-full h-[80vh]">
        {!imageLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={item.url}
          fill
          alt=""
          className={cn(
            'object-contain transition-opacity',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <video
        ref={videoRef}
        src={item.url}
        controls
        playsInline
        preload="metadata"
        className="max-h-[80vh] max-w-full w-full object-contain rounded-urbancare-lg"
      />
    </div>
  );
}

export const ThreadImagePreview = ({
                                     className,
                                     mediaItems,
                                   }: ThreadImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateState();

    api.on('select', updateState);

    return () => {
      api.off('select', updateState);
    };
  }, [api]);

  const displayItems = mediaItems.slice(0, 3);
  const remainingCount = mediaItems.length - 3;

  const openCarousel = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  if (mediaItems.length === 0) return null;

  return (
    <>
      {/* Single item */}
      {mediaItems.length === 1 && (
        <div className={cn('relative w-full h-96', className)}>
          <MediaGridThumb
            item={mediaItems[0]}
            className="absolute inset-0 rounded-urbancare-4xl"
            onClick={() => openCarousel(0)}
          />
        </div>
      )}

      {/* Two items */}
      {mediaItems.length === 2 && (
        <div className={cn('flex gap-1 h-80', className)}>
          {displayItems.map((item, index) => (
            <MediaGridThumb
              key={item.url}
              item={item}
              className="flex-1 rounded-urbancare-lg"
              onClick={() => openCarousel(index)}
            />
          ))}
        </div>
      )}

      {/* Three or more */}
      {mediaItems.length >= 3 && (
        <div className={cn('flex gap-1 h-96', className)}>
          <MediaGridThumb
            item={displayItems[0]}
            className="flex-1 rounded-l-urbancare-lg"
            onClick={() => openCarousel(0)}
          />
          <div className="flex flex-col flex-1 gap-1">
            <MediaGridThumb
              item={displayItems[1]}
              className="flex-1 rounded-tr-urbancare-lg"
              onClick={() => openCarousel(1)}
            />
            <MediaGridThumb
              item={displayItems[2]}
              className="flex-1 rounded-br-urbancare-lg"
              isDimmedWithCount={remainingCount > 0}
              remainingCount={remainingCount}
              onClick={() => openCarousel(2)}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Carousel Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle className="sr-only">Media Preview</DialogTitle>
        <DialogContent className="max-w-full h-full w-full p-0 bg-black/95 border-none">
          {/*<button*/}
          {/*  onClick={() => setIsOpen(false)}*/}
          {/*  className="absolute top-4 right-4 z-50 p-2 rounded-urbancare-full bg-black/50 text-white lg:hover:bg-black/70 lg:active:scale-95"*/}
          {/*>*/}
          {/*  <X className="w-6 h-6" />*/}
          {/*</button>*/}

          <div className="flex items-center justify-center h-full w-full px-12">
            <Carousel
              opts={{ startIndex, loop: true }}
              setApi={setApi}
              className="w-full max-w-5xl"
            >
              <CarouselContent>
                {mediaItems.map((item, index) => (
                  <CarouselItem
                    key={item.url}
                    className="flex items-center justify-center"
                  >
                    <CarouselMedia item={item} isActive={current - 1 === index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {count > 1 && (
                <>
                  <CarouselPrevious className="left-2 bg-black/50 text-white border-none lg:hover:bg-black/70" />
                  <CarouselNext className="right-2 bg-black/50 text-white border-none lg:hover:bg-black/70" />
                </>
              )}
            </Carousel>
          </div>

          {count > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-urbancare-full text-urbancare-base">
              {current} / {count}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ThreadMediaPreview = ThreadImagePreview;
