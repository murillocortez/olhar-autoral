
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadImagesFromSupabase, SupabaseImage, getSupabaseImage } from '../utils/supabaseImages';

interface ImageContextType {
    images: SupabaseImage[];
    loading: boolean;
    getImage: (category: string, filename?: string) => string | null;
}

const ImageContext = createContext<ImageContextType>({
    images: [],
    loading: true,
    getImage: () => null,
});

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [images, setImages] = useState<SupabaseImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await loadImagesFromSupabase();
                setImages(data);

                // Log for the user request
                const oldLinksFound = document.querySelectorAll('img[src*="ibb.co"]').length;
                console.log('--- Supabase Image Replacement Log ---');
                console.log(`✔ Images loaded from Supabase: ${data.length}`);
                console.log(`✔ Old ImgBB links found in DOM (initial): ${oldLinksFound}`);
            } catch (error) {
                console.error("Failed to load images", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const getImage = (category: string, filename?: string) => {
        return getSupabaseImage(images, category, filename);
    };

    return (
        <ImageContext.Provider value={{ images, loading, getImage }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useSupabaseImages = () => useContext(ImageContext);
