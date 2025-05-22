import React from 'react'

const ProductCategory = () => {
    const ProductCategoryData = [
        {
            title: 'Men\'s Watch',
            subtitle: 'Flash Sale',
            description: '25% Discount',
            image: '/images/category1.webp',

        },
        {
            title: 'Women\'s Watch',
            subtitle: 'Limited Edition',
            description: '30% Discount',
            image: '/images/category2.webp',

        }, {
            title: 'Couple Watch',
            subtitle: 'Limited Edition',
            description: '30% Discount',
            image: '/images/category3.webp',

        }
    ]
    return (
        <div className='flex gap-10 *:flex-10/12 flex-wrap md:*:flex-3/12   bg-[#030D1D]  '>
            {ProductCategoryData.map((product, index) => (
                <div key={index} className='h-72  border-6 border-gray-100/30 outline-8 outline-black' style={{
                    backgroundImage: `url(${product.image})`,
                }}>
                    <div className='  flex flex-col items-end px-10 gap-3 justify-center w-full h-full bg-black/50 text-white text-center'>
                        <h3 className='text-2xl font-medium !italic text-yellow-400'>{product.subtitle}</h3>
                        <h2 className='text-5xl '>{product.title}</h2>
                        <p className='text-2xl font-light text-gray-200'>{product.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCategory