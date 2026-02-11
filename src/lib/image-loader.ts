export default function imageLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
}) {
    // Extract file ID from the src URL
    // Handles both /api/file/{id} and direct {id} formats
    const fileId = src.includes('/api/file/')
        ? src.split('/api/file/')[1]
        : src;

    return `/api/image/${fileId}?w=${width}&q=${quality || 75}`;
}