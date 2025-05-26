import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@components/common/Icon';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're in cashier mode based on the URL path
  const isCashier = location.pathname.startsWith('/cashier');

  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Check for URL query parameters for status filtering
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get('status');
    
    if (statusParam && ['pending', 'processing', 'ready_for_pickup', 'completed', 'cancelled'].includes(statusParam)) {
      setActiveFilter(statusParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (orders.length > 0) {
      filterOrders(activeFilter);
    }
  }, [orders, activeFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Use the appropriate token based on whether we're in cashier or admin mode
      const token = localStorage.getItem(isCashier ? 'cashierToken' : 'adminToken');
      
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
        setFilteredOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = (filter) => {
    if (filter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filter));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ready_for_pickup':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏱️';
      case 'processing':
        return '🔄';
      case 'ready_for_pickup':
        return '📦';
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '❓';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          {isCashier && (
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredOrders.length}</span> orders
            </div>
          )}
        </div>
        
        {isCashier && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Icon name="Info" className="w-5 h-5" />
              <h4 className="font-medium">Quick Order Management</h4>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Click on any order to view details and update its status. Use the sidebar navigation to filter orders by status.
            </p>
          </div>
        )}
        
        {/* Only show filter buttons for admin users, not for cashier */}
        {!isCashier && (
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'all' 
                ? 'bg-hamutea-red text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Icon name="ListFilter" className="w-5 h-5" />
              All Orders
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
            >
              <span>⏱️</span>
              Pending
            </button>
            <button 
              onClick={() => setActiveFilter('processing')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'processing' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              <span>🔄</span>
              Processing
            </button>
            <button 
              onClick={() => setActiveFilter('ready_for_pickup')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'ready_for_pickup' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
            >
              <span>📦</span>
              Ready for Pickup
            </button>
            <button 
              onClick={() => setActiveFilter('completed')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
            >
              <span>✅</span>
              Completed
            </button>
            <button 
              onClick={() => setActiveFilter('cancelled')}
              className={`px-5 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${activeFilter === 'cancelled' 
                ? 'bg-red-500 text-white' 
                : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
            >
              <span>❌</span>
              Cancelled
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    {orders.length === 0 ? 'No orders found' : `No ${activeFilter !== 'all' ? activeFilter : ''} orders found`}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${isCashier && order.status === 'pending' ? 'bg-yellow-50' : ''}`}
                    onClick={() => navigate(`${isCashier ? '/cashier' : '/admin'}/orders/${order.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer_name || 'Guest'}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(order.created_at)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₱{parseFloat(order.total_amount).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex items-center gap-1.5 text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        <span>{getStatusIcon(order.status)}</span>
                        {order.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      {isCashier && order.status === 'pending' && (
                        <span className="ml-2 animate-pulse inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex items-center gap-1.5 text-sm leading-5 font-semibold rounded-full ${
                        order.payment_status === 'paid' ? 'bg-green-100 text-green-800 border border-green-200' : 
                        order.payment_status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' : 
                        'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {order.payment_status === 'paid' ? '💰' : order.payment_status === 'cancelled' ? '❌' : '⏳'}
                        {order.payment_status === 'failed' ? 'Cancelled' : order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`${isCashier ? '/cashier' : '/admin'}/orders/${order.id}`);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-full transition-colors"
                      >
                        <Icon name="Eye" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderList;