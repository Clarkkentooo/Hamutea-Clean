import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Icon from '@components/common/Icon';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're in cashier mode based on the URL path
  const isCashier = location.pathname.startsWith('/cashier');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Check if we're in cashier mode based on the URL path
      const isCashier = location.pathname.startsWith('/cashier');
      const token = localStorage.getItem(isCashier ? 'cashierToken' : 'adminToken');
      
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.message || 'Failed to fetch order details');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrderStatus = async (status) => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem(isCashier ? 'cashierToken' : 'adminToken');
      
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(prev => ({ ...prev, status }));
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch (err) {
      alert('Error updating order status');
      console.error(err);
    } finally {
      setUpdatingStatus(false);
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
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading order details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="text-center py-10">
        <p>Order not found</p>
        <button 
          onClick={() => navigate(isCashier ? '/cashier/orders' : '/admin/orders')}
          className="mt-4 text-hamutea-red hover:underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(isCashier ? '/cashier/orders' : '/admin/orders')}
          className="text-gray-600 hover:text-gray-900"
        >
          <Icon name="ArrowLeft" className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                <span>{getStatusIcon(order.status)}</span>
                {order.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p>{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p>{order.payment_method || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <span className={`px-3 py-1.5 inline-flex items-center gap-1.5 text-sm leading-5 font-semibold rounded-full ${
                  order.payment_status === 'paid' ? 'bg-green-100 text-green-800 border border-green-200' : 
                  order.payment_status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' : 
                  'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}>
                  {order.payment_status === 'paid' ? '💰' : order.payment_status === 'cancelled' ? '❌' : '⏳'}
                  {order.payment_status === 'failed' ? 'Cancelled' : order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold">₱{parseFloat(order.total_amount).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt={item.product_name} 
                              className="h-10 w-10 rounded-md object-cover mr-3"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                              <Icon name="Package" className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <span>{item.product_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        ₱{parseFloat(item.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        ₱{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
                
                {/* Total row */}
                <tr className="bg-gray-50">
                  <td colSpan="3" className="px-4 py-4 text-right font-medium">
                    Total
                  </td>
                  <td className="px-4 py-4 text-right font-bold">
                    ₱{parseFloat(order.total_amount).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Customer Info and Actions */}
        <div>
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{order.customer_name || 'Guest'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{order.customer_email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pick-up Location</p>
                <p>Hamutea Main Branch</p>
              </div>
            </div>
          </div>
          
          {/* Order Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            
            <h2 className="text-xl font-bold mb-6 text-center text-hamutea-red">UPDATE ORDER STATUS</h2>
            
            {updatingStatus && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md text-center">
                Updating order status...
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={() => updateOrderStatus('pending')}
                disabled={order.status === 'pending' || updatingStatus}
                className={`w-full py-3 px-4 rounded-md text-center text-lg font-medium flex items-center justify-center gap-2 ${
                  order.status === 'pending' 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200'
                }`}
              >
                <span>⏱️</span>
                Pending
                {order.status === 'pending' && <span className="ml-2">✓</span>}
              </button>
              
              <button
                onClick={() => updateOrderStatus('processing')}
                disabled={order.status === 'processing' || updatingStatus}
                className={`w-full py-3 px-4 rounded-md text-center text-lg font-medium flex items-center justify-center gap-2 ${
                  order.status === 'processing' 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200'
                }`}
              >
                <span>🔄</span>
                Processing
                {order.status === 'processing' && <span className="ml-2">✓</span>}
              </button>
              
              <button
                onClick={() => updateOrderStatus('ready_for_pickup')}
                disabled={order.status === 'ready_for_pickup' || updatingStatus}
                className={`w-full py-3 px-4 rounded-md text-center text-lg font-medium flex items-center justify-center gap-2 ${
                  order.status === 'ready_for_pickup' 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-200'
                }`}
              >
                <span>📦</span>
                Ready for Pickup
                {order.status === 'ready_for_pickup' && <span className="ml-2">✓</span>}
              </button>
              
              <button
                onClick={() => updateOrderStatus('completed')}
                disabled={order.status === 'completed' || updatingStatus}
                className={`w-full py-3 px-4 rounded-md text-center text-lg font-medium flex items-center justify-center gap-2 ${
                  order.status === 'completed' 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200'
                }`}
              >
                <span>✅</span>
                Completed
                {order.status === 'completed' && <span className="ml-2">✓</span>}
              </button>
              
              {/* Only show cancel button for admin users */}
              {!isCashier && (
                <button
                  onClick={() => updateOrderStatus('cancelled')}
                  disabled={order.status === 'cancelled' || updatingStatus}
                  className={`w-full py-3 px-4 rounded-md text-center text-lg font-medium flex items-center justify-center gap-2 ${
                    order.status === 'cancelled' 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-200'
                  }`}
                >
                  <span>❌</span>
                  Cancelled
                  {order.status === 'cancelled' && <span className="ml-2">✓</span>}
                </button>
              )}
            </div>
            
            {isCashier && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-blue-700 font-medium mb-2">Order Processing Tips</h4>
                <ul className="text-sm text-blue-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">1.</span>
                    <span>Set to "Processing" when preparing the order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">2.</span>
                    <span>Mark as "Ready for Pickup" when the order is complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">3.</span>
                    <span>Set to "Completed" after customer pickup</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;