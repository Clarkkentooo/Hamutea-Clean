import PageTitle from "@features/admin/components/PageTitle";
import Transactions from "@features/admin/dashboard/components/Transactions";
import InfoCard from "@features/admin/dashboard/components/InfoCard";
import { SearchInput } from "@components/common/input";
import Orders from "@features/admin/dashboard/components/Orders";
import LatestMenu from "@features/admin/dashboard/components/LatestMenu";
import OrderManagement from "@features/admin/dashboard/components/OrderManagement";
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalMenus: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                totalOrders: 30,
                totalRevenue: 10000,
                totalMenus: 34,
                totalUsers: 100
            });
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row gap-5 justify-between mb-6">
                <PageTitle title="Dashboard" desc="Here's the Overall Overview of the System" />
                <SearchInput />
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-hamutea-gray">Loading dashboard data...</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <InfoCard icon="CupSoda" count={stats.totalMenus} desc="Total Menus" color="text-hamutea-yellow" />
                        <InfoCard icon="ReceiptText" count={stats.totalOrders} desc="Total Orders" color="text-hamutea-blue" />
                        <InfoCard icon="Wallet" count={`₱${stats.totalRevenue}`} desc="Total Revenues" color="text-hamutea-green" />
                        <InfoCard icon="Users" count={stats.totalUsers} desc="Total Users" color="text-hamutea-red" />
                    </div>
                    
                    {/* Order Management */}
                    <OrderManagement />
                    
                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column */}
                        <div className="flex-grow flex flex-col gap-6 lg:w-2/3">
                            <h1 className="text-xl font-bold">Order Summary</h1>
                            <div className="flex flex-col md:flex-row gap-6">
                                <Orders />
                                <LatestMenu />
                            </div>
                        </div>
                        
                        {/* Right Column */}
                        <div className="lg:w-1/3 flex-shrink-0">
                            <Transactions />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;