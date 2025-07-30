import ManageProducts from './productsPage';

export const metadata = {
    title: 'Products',
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <ManageProducts />
    );
}