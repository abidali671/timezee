
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

