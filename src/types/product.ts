export interface ProductT {
    id?: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
    category?: string;
    brands?: string;
    type?: string;
    discount?: number;
    rating?: number;
    imageFile?: File | null;
    slug?: string;
}

export interface Brand {
    id: string;
    name: string;
}

export interface ProductSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    control: any;
    errors: any;
    handleSubmit: any;
    onSubmit: (data: any) => void;
    brands: Brand[];
    brandsLoading: boolean;
    imagePreview: string | null;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: File | null;
    watch: any;
    setValue: any;
    categories: Brand[]
}
