import React, { useRef, useState } from "react";

type ZoomImageProps = {
    src: string;
    zoomScale?: number;
    alt?: string;
    className?: string;
};

const ZoomImage: React.FC<ZoomImageProps> = ({
    src,
    zoomScale = 2,
    alt = "Zoomed Image",
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } =
            containerRef.current?.getBoundingClientRect() ?? {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };

        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;

        setBackgroundPosition(`${x}% ${y}%`);
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden     rounded-lg ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
                backgroundImage: isHovering ? `url(${src})` : "none",
                backgroundSize: `${zoomScale * 100}%`,
                backgroundPosition: backgroundPosition,
                backgroundRepeat: "no-repeat",
            }}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-auto block pointer-events-none select-none transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"
                    }`}
                draggable={false}
            />
        </div>
    );
};

export default ZoomImage;