import ManageOrders from './ordersPage';

export const metadata = {
    title: 'Orders',
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <ManageOrders />
    );
}
