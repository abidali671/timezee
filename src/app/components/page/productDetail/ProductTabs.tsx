"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type TabItem = {
    label: string;
    value: string;
    content: React.ReactNode;
};

type ProductTabsProps = {
    tabs: TabItem[];
    defaultValue?: string;
    className?: string;
};

const ProductTabs: React.FC<ProductTabsProps> = ({ tabs, defaultValue, className }) => {
    return (
        <Tabs defaultValue={defaultValue || tabs[0].value} className={className}>
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="relative overflow-hidden group px-4 py-2 text-sm font-medium  bg-gray-600 cursor-pointer   data-[state=active]:text-white  transition-colors duration-300"
                    >
                        <span className="relative z-10">{tab.label}</span>

                        <span
                            className={cn(
                                "absolute left-0 bottom-0 h-0.5 w-full bg-yellow-400 transform transition-all duration-300 ease-in-out z-0",
                                "group-hover:h-full",
                                "data-[state=active]:h-full"
                            )}
                        />
                    </TabsTrigger>

                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="border h-full min-h-72 px-8 py-10 mt-0 border-gray-200">
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default ProductTabs;
