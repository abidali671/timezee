import { useState, useEffect } from 'react';

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // You can adjust this threshold to your needs
    };

    useEffect(() => {
        // Initial check on mount
        checkIsMobile();

        // Add event listener on resize to check the screen width
        window.addEventListener('resize', checkIsMobile);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
