import { useState, useEffect } from 'react';
import Icon from '@components/common/Icon';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch orders
    setLoading(true);
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-001',
          customer: 'Maria Santos',
          date: '2023-05-26 10:30 AM',
          items: [
            { name: 'Pearl Milk Tea', quantity: 2, price: 110.00 },
            { name: 'Add-on: Pearls', quantity: 1, price: 20.00 }
          ],
          total: 240.00,
          status: 'pending',
          paymentMethod: 'Cash',
          paymentStatus: 'pending'
        },
        {
          id: 'ORD-002',
          customer: 'Juan Dela Cruz',
          date: '2023-05-26 11:15 AM',
          items: [
            { name: 'Taro Milk Tea', quantity: 1, price: 130.00 },
            { name: 'Black Sugar Pearl Milk Tea', quantity: 1, price: 110.00 }
          ],
          total: 240.00,
          status: 'processing',
          paymentMethod: 'E-Cash',
          paymentStatus: 'paid'
        },
        {
          id: 'ORD-003',
          customer: 'Ana Reyes',
          date: '2023-05-26 12:45 PM',
          items: [
            { name: 'Passion Fruit QQ', quantity: 2, price: 120.00 }
          ],
          total: 240.00,
          status: 'completed',
          paymentMethod: 'Cash',
          paymentStatus: 'paid'
        },
        {
          id: 'ORD-004',
          customer: 'Carlos Mendoza',
          date: '2023-05-26 1:30 PM',
          items: [
            { name: 'Brown Sugar Boba', quantity: 1, price: 140.00 },
            { name: 'Egg Waffle', quantity: 1, price: 80.00 }
          ],
          total: 220.00,
          status: 'cancelled',
          paymentMethod: 'E-Cash',
          paymentStatus: 'refunded'
        },
        {
          id: 'ORD-005',
          customer: 'Sofia Garcia',
          date: '2023-05-26 2:15 PM',
          items: [
            { name: 'Iced Americano', quantity: 2, price: 110.00 }
          ],
          total: 220.00,
          status: 'pending',
          paymentMethod: 'Cash',
          paymentStatus: 'pending'
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, []);
  
  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-800 focus:ring-yellow-500';
      case 'processing': return 'bg-blue-50 text-blue-800 focus:ring-blue-500';
      case 'completed': return 'bg-green-50 text-green-800 focus:ring-green-500';
      case 'cancelled': return 'bg-red-50 text-red-800 focus:ring-red-500';
      default: return 'bg-gray-50 text-gray-800 focus:ring-gray-500';
    }
  };
  
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };
  
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  
  const handlePaymentStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: newStatus } : order
    ));
  };
  
  const openEditModal = (order) => {
    setSelectedOrder({...order});
    setIsEditModalOpen(true);
  };
  
  const saveOrderChanges = () => {
    if (!selectedOrder) return;
    
    setOrders(orders.map(order => 
      order.id === selectedOrder.id ? selectedOrder : order
    ));
    
    setIsEditModalOpen(false);
  };
  
  return (
    <div className="border border-hamutea-border rounded-2xl p-5 w-full">
      <div className="border-b border-hamutea-border pb-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold">Order Management</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'all'
                  ? 'bg-hamutea-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'processing'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-3 py-1 text-sm rounded-lg ${
                filterStatus === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hamutea-red"
          />
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      ₱{order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex justify-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs rounded-full px-3 py-1.5 font-semibold border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className={`text-xs rounded-full px-3 py-1.5 font-semibold border ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'} • {order.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(order)}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-full transition-colors"
                        >
                          <Icon name="Edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(order)}
                          className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                        >
                          <Icon name="Eye" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Order {selectedOrder.id}</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedOrder.customer}
                onChange={(e) => setSelectedOrder({...selectedOrder, customer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Items
              </label>
              <div className="border rounded-md divide-y">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="p-3 flex justify-between items-center">
                    <div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updatedItems = [...selectedOrder.items];
                          updatedItems[index].name = e.target.value;
                          setSelectedOrder({...selectedOrder, items: updatedItems});
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-hamutea-red mb-1"
                      />
                      <div className="flex gap-2">
                        <div className="w-20">
                          <label className="text-xs text-gray-500">Qty</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const updatedItems = [...selectedOrder.items];
                              updatedItems[index].quantity = parseInt(e.target.value);
                              setSelectedOrder({...selectedOrder, items: updatedItems});
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-hamutea-red"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Price</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const updatedItems = [...selectedOrder.items];
                              updatedItems[index].price = parseFloat(e.target.value);
                              setSelectedOrder({...selectedOrder, items: updatedItems});
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-hamutea-red"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updatedItems = selectedOrder.items.filter((_, i) => i !== index);
                        setSelectedOrder({...selectedOrder, items: updatedItems});
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Icon name="Trash" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="p-3">
                  <button
                    onClick={() => {
                      const updatedItems = [...selectedOrder.items, { name: '', quantity: 1, price: 0 }];
                      setSelectedOrder({...selectedOrder, items: updatedItems});
                    }}
                    className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500"
                  >
                    + Add Item
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => setSelectedOrder({...selectedOrder, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => setSelectedOrder({...selectedOrder, paymentStatus: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={selectedOrder.paymentMethod}
                  onChange={(e) => setSelectedOrder({...selectedOrder, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                >
                  <option value="Cash">Cash</option>
                  <option value="E-Cash">E-Cash</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={selectedOrder.total}
                  onChange={(e) => setSelectedOrder({...selectedOrder, total: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveOrderChanges}
                className="px-4 py-2 bg-hamutea-red hover:bg-red-700 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;