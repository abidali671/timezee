import React from 'react'
import ProductSidebar from '../components/page/productDetail/productSidebar'

const Layout = ({ children }: any) => {
    return (
        <div className='bg-[#030D1D]   px-20 py-10 flex justify-center items-start text-white'>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-10 w-full '>
                <div className='col-span-1  '>
                    <ProductSidebar />
                </div>
                <div className='col-span-2  '>
                    {children}
                </div>

            </div>


        </div>
    )
}

export default Layout