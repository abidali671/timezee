
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "SwissTime",
  description: "Luxurious watche's store ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  // Hide navbar and footer on dashboard and its children
   return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </Providers>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}
