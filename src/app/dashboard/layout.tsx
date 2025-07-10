import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayout from './DashboardLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const isAuthenticated = (await cookieStore).get('admin-auth')?.value === 'true';

    if (!isAuthenticated) {
        redirect('/admin/login');
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
