'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from './sectionTitle';
import CategoryFilter from '../../categoryFilter';
import ProductCarousel from '../../ProductCarousel';
import { allProducts } from '@/lib/products';
import { fetchAllProducts } from '@/lib/contentfull/client';

const ProductSlider = () => {
    const [productsData, setProductsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState('Rolex');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchAllProducts();
                setProductsData(response);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = [...productsData].filter(
        (product: any) => product.brandName === activeCategory
    );

    return (
        <div className="bg-black min-h-screen">
            <div className="container py-16 mx-auto flex flex-col">
                {/* Title */}
                <div className="flex justify-center items-center mb-6">
                    <SectionTitle className="text-center text-white whitespace-nowrap">
                        Popular In Store
                    </SectionTitle>
                </div>

                {/* Filter */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* Carousel */}
                <ProductCarousel products={filteredProducts} loading={loading} />
            </div>
        </div>
    );
};

export default ProductSlider;
