import {useEffect, useState} from "react";

export function useMobileScroll() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const isAtBottom = windowHeight + currentScrollY >= documentHeight - 40;

            const scrollDelta = currentScrollY - lastScrollY;

            if (scrollDelta < -20 || currentScrollY < 10 || isAtBottom) {
                setIsVisible(true);
            } else if (scrollDelta > 20 && currentScrollY > 50) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return {isVisible};
}