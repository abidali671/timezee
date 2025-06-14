'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function SafeImage({
    src,
    alt,
    ...props
}: {
    src: string | undefined | null
    alt: string
    [key: string]: any
}) {
    const [imgSrc, setImgSrc] = useState(() => {
        if (!src) return null
        return src.startsWith('//') ? `https:${src}` : src
    })

    if (!imgSrc) {
        return (
            <div className="bg-gray-200 flex items-center justify-center">
                No image
            </div>
        )
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc(null)}
            {...props}
        />
    )
}