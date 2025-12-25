import Image from 'next/image';

interface ThreadImagePreviewProps {
    className?: string;
    imageLinks: string[];
}

export const ThreadImagePreview = ({className, imageLinks}: ThreadImagePreviewProps) => {
    const displayImages = imageLinks.slice(0, 3);
    const remainingCount = imageLinks.length - 3;

    if (imageLinks.length === 0) return null;

    if (imageLinks.length === 1) {
        return (
            <div className={`relative w-full h-96 ${className}`}>
                <Image
                    src={imageLinks[0]}
                    alt=""
                    fill
                    className="object-contain bg-black/5 rounded-lg"
                />
            </div>
        );
    }

    if (imageLinks.length === 2) {
        return (
            <div className={`flex gap-1 h-80 ${className}`}>
                {displayImages.map((link) => (
                    <div key={link} className="relative flex-1 overflow-hidden rounded-lg">
                        <Image
                            src={link}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        );
    }

    // 3 or more images
    return (
        <div className={`flex gap-1 h-96 ${className}`}>
            {/* Left - large image, takes 50% width */}
            <div className="relative flex-1 overflow-hidden rounded-l-lg">
                <Image
                    src={displayImages[0]}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            {/* Right side - takes 50% width, split vertically */}
            <div className="flex flex-col flex-1 gap-1">
                {/* Top right - exactly 50% height */}
                <div className="relative flex-1 overflow-hidden rounded-tr-lg">
                    <Image
                        src={displayImages[1]}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Bottom right - exactly 50% height */}
                <div className="relative flex-1 overflow-hidden rounded-br-lg">
                    <Image
                        src={displayImages[2]}
                        alt=""
                        fill
                        className={`blur-xs object-cover ${remainingCount > 0 ? 'brightness-50' : ''}`}
                    />

                    {remainingCount > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-3xl font-semibold">
                +{remainingCount}
              </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};