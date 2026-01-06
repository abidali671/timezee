import { productCategories } from '@/lib/products'
import React from 'react'

const ProductCategory = () => {

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between bg-[#030D1D]">
            {productCategories.map((product, index) => (
                <div
                    title='Product Category'
                    key={index}
                    className="flex-1 h-auto md:h-72 border-6 border-gray-100/30 outline-8 outline-black  py-16 md:py-0"
                    style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="flex flex-col  whitespace-nowrap items-end px-10 gap-3 justify-center w-full h-full bg-black/50 text-white text-center">
                        <h3 className="text-2xl font-medium !italic text-yellow-400">{product.subtitle}</h3>
                        <h2 className="text-3xl  md:text-5xl whitespace-nowrap">{product.title}</h2>
                        <p className="text-2xl font-light text-gray-200">{product.description}</p>
                    </div>
                </div>
            ))}
        </div>


    )
}

export default ProductCategory