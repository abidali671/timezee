'use client';

import React, { useState } from 'react';
import SectionTitle from './sectionTitle';
import CategoryFilter from '../../categoryFilter';
import ProductCarousel from '../../ProductCarousel';
import { allProducts } from '@/lib/products';

const ProductSlider = () => {
    const [activeCategory, setActiveCategory] = useState('Classic');

    const filteredProducts = allProducts.filter(
        (product) => product.category === activeCategory
    );

    return (
        <div className="bg-black min-h-screen">
            <div className="container p-6 py-16 mx-auto flex flex-col">
                {/* Title */}
                <div className="flex justify-center items-center mb-6">
                    <SectionTitle className="text-center text-white whitespace-nowrap ">
                        Popular In Store
                    </SectionTitle>
                </div>

                {/* Filter */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* Carousel */}
                <ProductCarousel products={filteredProducts} />
            </div>
        </div>
    );
};

export default ProductSlider;
