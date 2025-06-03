// app/ClientLayoutWrapper.tsx (client component)
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const hideNavAndFooter = pathname.startsWith("/dashboard");

    return (
        <>
            {!hideNavAndFooter && <Navbar />}
            {children}
            {!hideNavAndFooter && <Footer />}
        </>
    );
}
