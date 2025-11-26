
import { supabase } from '../supabaseClient';

export interface SupabaseImage {
    name: string;
    category: string;
    publicUrl: string;
}

// Map local categories to Supabase bucket folders
const CATEGORY_FOLDER_MAP: Record<string, string> = {
    'shows': 'Shows',
    'gastronomia': 'gastronomia',
    'retratos': 'retratos',
    'projeto social': 'projeto_social',
    'projetos autorais': 'projeto_social', // Mapping "Projetos Autorais" to "projeto_social" as requested/inferred
    'servicos': 'Services',
    'site': 'site',
    'autorais': 'projeto_social' // Fallback
};

export const loadImagesFromSupabase = async (): Promise<SupabaseImage[]> => {
    const folders = [
        'Shows',
        'gastronomia',
        'retratos',
        'projeto_social',
        'Services',
        'site',
        'Services/Shows e Eventos' // Added specific subfolder
    ];
    let allImages: SupabaseImage[] = [];

    for (const folder of folders) {
        const { data, error } = await supabase
            .storage
            .from('fotos')
            .list(folder, { limit: 100 });

        if (error) {
            console.error(`Error loading images from folder ${folder}:`, error);
            continue;
        }

        if (data) {
            const folderImages = data
                .filter(file => file.id !== null) // Filter out folders
                .map(file => {
                    const filePath = `${folder}/${file.name}`;
                    const { data: { publicUrl } } = supabase.storage.from('fotos').getPublicUrl(filePath);

                    return {
                        name: filePath,
                        category: folder,
                        publicUrl: publicUrl
                    };
                });
            allImages = [...allImages, ...folderImages];
        }
    }

    return allImages;
};

export const getSupabaseImage = (images: SupabaseImage[], category: string, filename?: string): string | null => {
    // If filename is provided, try to find exact match
    if (filename) {
        const exactMatch = images.find(img => img.name.includes(filename));
        if (exactMatch) return exactMatch.publicUrl;
    }

    // Otherwise return a random image from the category
    const categoryImages = images.filter(img => {
        const mappedFolder = CATEGORY_FOLDER_MAP[category.toLowerCase()] || category;
        return img.category.toLowerCase() === mappedFolder.toLowerCase();
    });

    if (categoryImages.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * categoryImages.length);
    return categoryImages[randomIndex].publicUrl;
};
