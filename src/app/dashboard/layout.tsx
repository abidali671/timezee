import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayout from './DashboardLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: "Dashboard | SwissTime",
        template: "%s | SwissTime",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const isAuthenticated = (await cookieStore).get('admin-auth')?.value === 'true';

    if (!isAuthenticated) {
        redirect('/admin/login');
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
