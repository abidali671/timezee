// app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/orderContext'; // the new one
import { ProductProvider } from '@/context/productsContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <OrderProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </OrderProvider>
        </CartProvider>
    );
}
