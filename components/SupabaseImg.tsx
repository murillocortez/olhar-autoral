
import React, { useState, useEffect } from 'react';
import { useSupabaseImages } from '../contexts/ImageContext';

interface SupabaseImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    category: string;
    fallbackSrc?: string; // The old ibb link or local path
    filename?: string; // Optional: try to match a specific filename in Supabase
}

const SupabaseImg: React.FC<SupabaseImgProps> = ({
    category,
    fallbackSrc,
    filename,
    className,
    alt,
    ...props
}) => {
    const { getImage, loading } = useSupabaseImages();
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) {
            const url = getImage(category, filename);
            if (category === "Services/Shows e Eventos") {
                console.log(`SupabaseImg Debug: Category="${category}", URL="${url}"`);
            }
            if (url) {
                setImgSrc(url);
            } else if (fallbackSrc) {
                setImgSrc(fallbackSrc);
            }
        }
    }, [loading, category, filename, fallbackSrc, getImage]);

    if (loading && !imgSrc) {
        return <div className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`} />;
    }

    if (!imgSrc) {
        return <div className={`bg-neutral-200 dark:bg-neutral-800 ${className}`} />;
    }

    return (
        <picture>
            <img
                src={imgSrc}
                alt={alt || 'Image'}
                loading="lazy"
                decoding="async"
                className={className}
                {...props}
                onError={(e) => {
                    console.error("Image load error for:", imgSrc);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-neutral-200', 'dark:bg-neutral-800');
                }}
            />
        </picture>
    );
};

export default SupabaseImg;
