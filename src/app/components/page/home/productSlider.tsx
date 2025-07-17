import React from 'react';
import SectionTitle from './sectionTitle';
import ProductCarousel from '../../ProductCarousel';
import { Product } from '@/context/productsContext';

const ProductSlider = ({ products }: { products: Product[] }) => {
    return (
        <div className="bg-black min-h-screen">
            <div className="container py-16 mx-auto flex flex-col gap-y-5">
                {/* Title */}
                <div className="flex justify-center items-center mb-6">
                    <SectionTitle className="text-center text-white whitespace-nowrap">
                        Popular In Store
                    </SectionTitle>
                </div>

                {/* Carousel */}
                <ProductCarousel products={products} />
            </div>
        </div>
    );
};

export default ProductSlider;
