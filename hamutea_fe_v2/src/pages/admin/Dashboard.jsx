import { useState, useEffect } from 'react';
import InfoCard from '@features/admin/dashboard/components/InfoCard';
import Transactions from '@features/admin/dashboard/components/Transactions';
import Orders from '@features/admin/dashboard/components/Orders';
import LatestMenu from '@features/admin/dashboard/components/LatestMenu';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for API call
    // In a real implementation, you would fetch data from your backend
    setTimeout(() => {
      setStats({
        totalOrders: 156,
        totalRevenue: 12580.50,
        ordersByStatus: [
          { status: 'pending', count: 24 },
          { status: 'processing', count: 42 },
          { status: 'shipped', count: 58 },
          { status: 'delivered', count: 28 },
          { status: 'cancelled', count: 4 }
        ],
        recentOrders: [
          { id: 1, customer_name: 'John Doe', total_amount: 125.50, status: 'delivered', created_at: '2023-06-15' },
          { id: 2, customer_name: 'Jane Smith', total_amount: 89.99, status: 'shipped', created_at: '2023-06-14' },
          { id: 3, customer_name: 'Robert Johnson', total_amount: 210.75, status: 'processing', created_at: '2023-06-14' },
          { id: 4, customer_name: 'Emily Davis', total_amount: 45.25, status: 'pending', created_at: '2023-06-13' },
          { id: 5, customer_name: 'Michael Brown', total_amount: 178.30, status: 'delivered', created_at: '2023-06-12' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard count={stats.totalOrders} desc="Total Orders" icon="ShoppingCart" color="text-hamutea-red" />
            <InfoCard count={`₱${stats.totalRevenue.toFixed(2)}`} desc="Total Revenue" icon="Wallet" color="text-hamutea-blue" />
            <InfoCard count={stats.ordersByStatus.find(o => o.status === 'pending')?.count || 0} desc="Pending Orders" icon="Clock" color="text-hamutea-yellow" />
            <InfoCard count={stats.ordersByStatus.find(o => o.status === 'delivered')?.count || 0} desc="Delivered Orders" icon="CheckCircle" color="text-hamutea-green" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Orders />
            </div>
            <div>
              <Transactions />
            </div>
          </div>
          
          <div>
            <LatestMenu />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;