// app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { StoreProvider } from '@/context/StoreContext'; // the new one

export function Providers({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </CartProvider>
    );
}
