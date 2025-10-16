'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/context/productsContext';
import { useCart } from '@/context/CartContext';
const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [sortOption, setSortOption] = useState('');
    const [brands, setBrands] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const { cart, dispatch } = useCart();
    const handleAddToCart = (product: Product) => {
        const cartItem = cart.find(item => item.slug === product.slug);
        const currentQty = cartItem?.quantity || 0;

        if (currentQty >= product.stock) {
            alert('Product is out of stock');
            return;
        }

        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity: 1 }, // stock already exists in `product`
        });
    };
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [brandsRes, categoriesRes] = await Promise.all([
                    fetch('/api/brands'),
                    fetch('/api/categories')
                ]);

                const [brandsData, categoriesData] = await Promise.all([
                    brandsRes.json(),
                    categoriesRes.json()
                ]);

                if (!brandsRes.ok) throw new Error(brandsData.message || 'Failed to fetch brands');
                if (!categoriesRes.ok) throw new Error(categoriesData.message || 'Failed to fetch categories');

                setBrands(brandsData.items || []);
                setCategories(categoriesData.items || []);
            } catch (err) {
                console.error(err);

            }
        };

        fetchFilterData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const [minPrice, maxPrice] = priceRange;
                const res = await fetch(
                    `/api/products?page=${page}&limit=${limit}&sort=${sortOption}&query=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}`
                );
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to fetch products');

                setProducts(data.items || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit, sortOption, searchQuery, priceRange]);



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };
 
    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBrand(e.target.value);
        setPage(1);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setPage(1);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRange = [...priceRange] as [number, number];
        newRange[index] = Number(e.target.value);
        setPriceRange(newRange);
        setPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shop</h1>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border p-2 rounded"
                />
                <select value={selectedBrand} onChange={handleBrandChange} className="border p-2 rounded">
                    <option value="">All Brands</option>
                    {brands.map((brand: any) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2 rounded">
                    <option value="">All Categories</option>
                    {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <select value={sortOption} onChange={handleSortChange} className="border p-2 rounded">
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>

            {/* Product Listing */}
            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded flex flex-col gap-y-3 ">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain mb-4 " />
                            <h2 className="text-lg !font-bold">{product.name}</h2>
                            <p className="text-gray-600 font-bold">${product.price}</p>
                            <button className=' bg-black/90 cursor-pointer px-4 py-2 border font-medium hover:bg-white hover:text-black transition-colors duration-300 text-white rounded-lg' onClick={() => handleAddToCart(product)}>Add to cart</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className='flex gap-x-3 items-center justify-center'>
                <div className="flex justify-center mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 border rounded ${pageNum === page ? 'bg-black text-white' : ''}`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
                <div  >
                    <select defaultValue={5} onChange={(e) => setLimit(Number(e.target.value))} className=" rounded  mt-8   border py-2 px-4">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Shop;