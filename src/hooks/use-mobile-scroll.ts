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

            if (currentScrollY < lastScrollY - 5 || currentScrollY < 10 || isAtBottom) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return {isVisible};
}