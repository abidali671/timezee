import React from 'react'
import ProductSidebar from '../components/page/productDetail/productSidebar'

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-[#030D1D]  p-4 md:px-20 md:py-10  grid place-content-center text-white'>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-5 md:py-10 w-full    '>
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