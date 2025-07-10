export interface ProductT {
    id?: string;
    name: string;
    price: number;
    stock: number;
    description: string | Document;
    imageUrl?: string;
    category?: string;
    brands?: string;
    type?: string;
    discount?: number;
    rating?: number;
    imageFile?: File | null;
    slug?: string;
    excerpt: string;

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

export interface ProductData {
    id:string;
    name: string;
    excerpt: string;
    slug: string;
    price: number;
    stock: number;
    discount?: number;
    rating?: number;
    description: string;
    type?: string;
    brands: string;
    category: string;
    imageUrl?: string;
    imageFile?: File | null;
}
