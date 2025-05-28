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
            <div className="md:hidden p-4">
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
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "bg-[#030D1D]  md:bg-transparent z-40 transition-transform duration-300 md:relative",
                    "fixed top-0 left-0 h-full   overflow-y-auto md:translate-x-0  ",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Close button (mobile only) */}
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-lg text-white   border px-3 py-1 rounded"
                    >
                        Close
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col py-10 px-7 md:p-4">
                    <div className='flex flex-col gap-y-7 py-3'>
                        <h1 className='text-4xl'>Heading</h1>
                        <hr className="max-w-md text-red-300 border-1 md:border-2 border-yellow-400 relative bottom-4" />
                    </div>

                    {sidebarData.map((item, index) => (
                        <Accordion key={index} type="single" collapsible className='*:py-3'>
                            <AccordionItem value={`item-${index}`}>
                                {item.children.length > 0 ? (
                                    <AccordionTrigger className='text-2xl p-0 text-gray-400'>
                                        {item.title}
                                    </AccordionTrigger>
                                ) : (
                                    <h1 className='text-2xl text-gray-400'>{item.title}</h1>
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
            </div>
        </>
    );
};

export default ProductSidebar;
