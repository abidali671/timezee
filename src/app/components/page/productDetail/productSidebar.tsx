'use client';

import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from 'lucide-react'; // for filter icon
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { AnimatedButton } from '../../animatedButton';

const sidebarData = [
    { title: 'Stylish Watches', children: [] },
    {
        title: 'Digital Watches', children: [
            { title: 'Timex' }, { title: 'Rabeela' }, { title: 'Anuradha art' }
        ]
    },
    {
        title: 'Fast Track', children: [
            { title: 'Timex' }, { title: 'Rabeela' }, { title: 'Anuradha art' }
        ]
    },
    {
        title: 'Couple Watch', children: [
            { title: 'Timex' }, { title: 'Rabeela' }, { title: 'Anuradha art' }
        ]
    },
    { title: 'Kids Watches', children: [] }
];

const ProductSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden p-4">
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 text-lg  "
                >
                    <SlidersHorizontal size={20} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "bg-[#030D1D]  lg:bg-transparent z-40 transition-transform duration-300 lg:relative",
                    "fixed top-0 left-0 h-full w-auto lg:w-96   overflow-y-auto lg:translate-x-0  ",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Close button (mobile only) */}
                <div className="lg:hidden flex justify-end p-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-lg text-white   border px-3 py-1 rounded"
                    >
                        Close
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className='flex flex-col  '>
                    <div className="flex flex-col py-10 px-7 lg:p-4">
                        <div className='flex flex-col gap-y-7 py-3'>
                            <h3 className='text-3xl '>Heading</h3>
                            <hr className="max-w-md text-red-300 border-1 lg:border-2 border-yellow-400 relative bottom-4" />
                        </div>

                        {sidebarData.map((item, index) => (
                            <Accordion key={index} type="single" collapsible className='*:py-3'>
                                <AccordionItem value={`item-${index}`}>
                                    {item.children.length > 0 ? (
                                        <AccordionTrigger className='text-lg p-0 text-gray-400'>
                                            {item.title}
                                        </AccordionTrigger>
                                    ) : (
                                        <h4 className='text-lg text-gray-400'>{item.title}</h4>
                                    )}
                                    <AccordionContent>
                                        {item.children.length > 0 && (
                                            <ul className='list-disc pl-5 grid gap-y-5 pt-5'>
                                                {item.children.map((child, childIndex) => (
                                                    <li key={childIndex} className='text-gray-400'>
                                                        {child.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                    <div className="flex flex-col py-10 px-7 lg:p-4    ">
                        <div className='flex flex-col gap-y-7 py-3'>
                            <h2 className='text-3xl '>Shopping</h2>
                            <hr className="max-w-md text-red-300 border-1 lg:border-2 border-yellow-400 relative bottom-4" />
                        </div>
                        <div className="relative w-full h-60 lg:h-96">
                            <Image
                                src="https://timzee-demo.myshopify.com/cdn/shop/files/Watch6_750x.png?v=1614300921"
                                alt="product"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                title='Product Image'
                            />
                        </div>
                        <AnimatedButton className="w-full text-sm mx-auto">Shop Now</AnimatedButton>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSidebar;
