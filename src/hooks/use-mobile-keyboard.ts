'use client';

import { useEffect, useState } from 'react';

const useIsVirtualKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Logic to determine if keyboard is open based on window height change
      // A common threshold for the minimum height change to be considered a keyboard
      const minKeyboardHeight = 100;
      const currentViewportHeight = window.innerHeight;
      const initialViewportHeight =
        window.visualViewport?.height || window.screen.height;

      // Check if the current height is significantly less than the original height
      // (accounting for browser UI changes)
      if (initialViewportHeight - currentViewportHeight > minKeyboardHeight) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    // Use visualViewport for more accurate results if available (some modern browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      // Fallback for older browsers (less reliable)
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isKeyboardOpen;
};

export default useIsVirtualKeyboardOpen;
