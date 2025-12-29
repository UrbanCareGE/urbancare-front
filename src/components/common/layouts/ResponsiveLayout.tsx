'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveContextType {
    deviceType: DeviceType;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    width: number;
    mobileAgent: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export function useResponsive() {
    const context = useContext(ResponsiveContext);
    if (!context) throw new Error('useResponsive must be used within ResponsiveLayout');
    return context;
}

interface Props {
    children: React.ReactNode;
    initialIsMobile: boolean;
}

export default function ResponsiveLayout({ children, initialIsMobile }: Props) {
    const [dimensions, setDimensions] = useState({
        width: initialIsMobile ? 375 : 1024, // Reasonable defaults
        deviceType: initialIsMobile ? 'mobile' as DeviceType : 'desktop' as DeviceType,
        mobileAgent: initialIsMobile,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let deviceType: DeviceType;

            if (width < 768) deviceType = 'mobile';
            else if (width < 1024) deviceType = 'tablet';
            else deviceType = 'desktop';

            setDimensions((oldValue) => ({ ...oldValue, width, deviceType,  }));
        };

        // Set initial dimensions on mount
        handleResize();

        // Debounce resize events for performance
        let timeoutId: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const value: ResponsiveContextType = {
        deviceType: dimensions.deviceType,
        isMobile: dimensions.deviceType === 'mobile',
        isTablet: dimensions.deviceType === 'tablet',
        isDesktop: dimensions.deviceType === 'desktop',
        width: dimensions.width,
        mobileAgent: dimensions.mobileAgent
    };

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
}