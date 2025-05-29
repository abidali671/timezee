import Image from "next/image";

export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-125"
            />
        </div>
    );
};
