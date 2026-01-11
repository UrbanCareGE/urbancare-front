export default function imageLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
}) {
    // Extract file ID from the src URL
    // Handles both /api/secure/file/{id} and direct {id} formats
    const fileId = src.includes('/api/secure/file/')
        ? src.split('/api/secure/file/')[1]
        : src;

    return `/api/image/${fileId}?w=${width}&q=${quality || 75}`;
}