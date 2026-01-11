'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {X} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

interface ThreadImagePreviewProps {
    className?: string;
    imageLinks: string[];
}

export const ThreadImagePreview = ({className, imageLinks}: ThreadImagePreviewProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleImageLoad = (link: string) => {
        setLoadedImages(prev => new Set(prev).add(link));
    };

    const isLoaded = (link: string) => loadedImages.has(link);

    const displayImages = imageLinks.slice(0, 3);
    const remainingCount = imageLinks.length - 3;

    const openCarousel = (index: number) => {
        setStartIndex(index);
        setIsOpen(true);
    };

    if (imageLinks.length === 0) return null;

    return (
        <>
            {/* Image Grid */}
            {imageLinks.length === 1 && (
                <div
                    className={cn('relative w-full h-96 cursor-pointer', className)}
                    onClick={() => openCarousel(0)}
                >
                    {!isLoaded(imageLinks[0]) && (
                        <Skeleton className="absolute inset-0 rounded-3xl"/>
                    )}
                    <Image
                        src={imageLinks[0]}
                        alt=""
                        fill
                        className={cn(
                            "object-cover bg-black/5 rounded-3xl transition-opacity",
                            isLoaded(imageLinks[0]) ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => handleImageLoad(imageLinks[0])}
                    />
                </div>
            )}

            {imageLinks.length === 2 && (
                <div className={cn('flex gap-1 h-80', className)}>
                    {displayImages.map((link, index) => (
                        <div
                            key={link}
                            className="relative flex-1 overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => openCarousel(index)}
                        >
                            {!isLoaded(link) && (
                                <Skeleton className="absolute inset-0"/>
                            )}
                            <Image
                                src={link}
                                alt=""
                                fill
                                className={cn(
                                    "object-cover transition-opacity",
                                    isLoaded(link) ? "opacity-100" : "opacity-0"
                                )}
                                onLoad={() => handleImageLoad(link)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {imageLinks.length >= 3 && (
                <div className={cn('flex gap-1 h-96', className)}>
                    <div
                        className="relative flex-1 overflow-hidden rounded-l-lg cursor-pointer"
                        onClick={() => openCarousel(0)}
                    >
                        {!isLoaded(displayImages[0]) && (
                            <Skeleton className="absolute inset-0"/>
                        )}
                        <Image
                            src={displayImages[0]}
                            alt=""
                            fill
                            className={cn(
                                "object-cover transition-opacity",
                                isLoaded(displayImages[0]) ? "opacity-100" : "opacity-0"
                            )}
                            onLoad={() => handleImageLoad(displayImages[0])}
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-1">
                        <div
                            className="relative flex-1 overflow-hidden rounded-tr-lg cursor-pointer"
                            onClick={() => openCarousel(1)}
                        >
                            {!isLoaded(displayImages[1]) && (
                                <Skeleton className="absolute inset-0"/>
                            )}
                            <Image
                                src={displayImages[1]}
                                alt=""
                                fill
                                className={cn(
                                    "object-cover transition-opacity",
                                    isLoaded(displayImages[1]) ? "opacity-100" : "opacity-0"
                                )}
                                onLoad={() => handleImageLoad(displayImages[1])}
                            />
                        </div>

                        <div
                            className="relative flex-1 overflow-hidden rounded-br-lg cursor-pointer"
                            onClick={() => openCarousel(2)}
                        >
                            {!isLoaded(displayImages[2]) && (
                                <Skeleton className="absolute inset-0"/>
                            )}
                            <Image
                                src={displayImages[2]}
                                alt=""
                                fill
                                className={cn(
                                    'object-cover transition-opacity',
                                    remainingCount > 0 && 'brightness-50 blur-xs',
                                    isLoaded(displayImages[2]) ? "opacity-100" : "opacity-0"
                                )}
                                onLoad={() => handleImageLoad(displayImages[2])}
                            />
                            {remainingCount > 0 && isLoaded(displayImages[2]) && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-white text-3xl font-semibold">
                                        +{remainingCount}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Carousel Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTitle className={"sr-only"}>opana</DialogTitle>
                <DialogContent className="max-w-full h-full w-full p-0 bg-black/95 border-none">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                        <X className="w-6 h-6"/>
                    </button>

                    <div className="flex items-center justify-center h-full w-full px-12">
                        <Carousel
                            opts={{
                                startIndex: startIndex,
                                loop: true,
                            }}
                            setApi={setApi}
                            className="w-full max-w-5xl"
                        >
                            <CarouselContent>
                                {imageLinks.map((link, index) => (
                                    <CarouselItem key={link} className="flex items-center justify-center">
                                        <div className="relative w-full h-[80vh]">
                                            {!isLoaded(link) && (
                                                <Skeleton className="absolute inset-0"/>
                                            )}
                                            <Image
                                                src={link}
                                                alt={`Image ${index + 1}`}
                                                fill
                                                className={cn(
                                                    "object-contain transition-opacity",
                                                    isLoaded(link) ? "opacity-100" : "opacity-0"
                                                )}
                                                onLoad={() => handleImageLoad(link)}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {count > 1 &&
                                <>
                                    <CarouselPrevious
                                        className="left-2 bg-black/50 text-white border-none hover:bg-black/70"/>
                                    <CarouselNext
                                        className="right-2 bg-black/50 text-white border-none hover:bg-black/70"/>
                                </>
                            }
                        </Carousel>
                    </div>

                    {count > 1 && <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                        {current} / {count}
                    </div>}
                </DialogContent>
            </Dialog>
        </>
    );
};