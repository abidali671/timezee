// app/dashboard/page.tsx
export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700">Total Products</h3>
                    <p className="text-2xl text-gray-600">30</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700">Total Orders</h3>
                    <p className="text-2xl text-gray-600">100</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700">Revenue</h3>
                    <p className="text-2xl text-gray-600">$5,000</p>
                </div>
            </div>
        </div>
    );
}
