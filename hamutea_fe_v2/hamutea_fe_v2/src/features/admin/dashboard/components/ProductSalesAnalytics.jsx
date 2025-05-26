import { useState, useEffect } from 'react';
import Icon from '@components/common/Icon';

const ProductSalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [sortBy, setSortBy] = useState('sales');
  const [sortOrder, setSortOrder] = useState('desc');
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to fetch product sales data
    setTimeout(() => {
      // Generate mock data
      const mockProducts = [
        { 
          id: 1, 
          name: 'Pearl Milk Tea', 
          category: 'Classic Milktea Series',
          sales: 142,
          revenue: 15620.00,
          avgRating: 4.8,
          stock: 85,
          trend: 'up'
        },
        { 
          id: 2, 
          name: 'Black Sugar Pearl Milk Tea', 
          category: 'Classic Milktea Series',
          sales: 128,
          revenue: 14080.00,
          avgRating: 4.9,
          stock: 72,
          trend: 'up'
        },
        { 
          id: 3, 
          name: 'Taro Milk Tea', 
          category: 'Specialty Drinks',
          sales: 113,
          revenue: 14690.00,
          avgRating: 4.7,
          stock: 65,
          trend: 'up'
        },
        { 
          id: 4, 
          name: 'Passion Fruit QQ', 
          category: 'Fruit Tea Series',
          sales: 98,
          revenue: 11760.00,
          avgRating: 4.6,
          stock: 58,
          trend: 'down'
        },
        { 
          id: 5, 
          name: 'Brown Sugar Boba', 
          category: 'Specialty Drinks',
          sales: 87,
          revenue: 12180.00,
          avgRating: 4.8,
          stock: 42,
          trend: 'up'
        },
        { 
          id: 6, 
          name: 'Iced Americano', 
          category: 'Coffee Series',
          sales: 76,
          revenue: 8360.00,
          avgRating: 4.5,
          stock: 90,
          trend: 'down'
        },
        { 
          id: 7, 
          name: 'Caramel Macchiato', 
          category: 'Coffee Series',
          sales: 68,
          revenue: 8840.00,
          avgRating: 4.7,
          stock: 75,
          trend: 'up'
        },
        { 
          id: 8, 
          name: 'Egg Waffle', 
          category: 'Snacks',
          sales: 54,
          revenue: 4320.00,
          avgRating: 4.6,
          stock: 30,
          trend: 'down'
        }
      ];
      
      setProductData(mockProducts);
      setLoading(false);
    }, 800);
  }, [timeRange]);
  
  // Sort products based on selected criteria
  const sortedProducts = [...productData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
  
  // Calculate totals
  const totalSales = productData.reduce((sum, product) => sum + product.sales, 0);
  const totalRevenue = productData.reduce((sum, product) => sum + product.revenue, 0);
  
  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];
  
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="border border-hamutea-border rounded-2xl p-5 w-full">
      <div className="border-b border-hamutea-border pb-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold">Product Sales Analytics</h2>
          
          <div className="flex flex-wrap gap-2">
            {timeRangeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-3 py-1 text-sm rounded-lg ${
                  timeRange === option.value
                    ? 'bg-hamutea-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading product data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Products Sold</p>
              <p className="text-2xl font-bold text-hamutea-red">{totalSales} items</p>
              <p className="text-xs text-gray-500 mt-1">across {productData.length} products</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-hamutea-blue">₱{totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">avg ₱{(totalRevenue / totalSales).toFixed(2)} per item</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Top Selling Product</p>
              <p className="text-2xl font-bold text-hamutea-green">{sortedProducts[0]?.name}</p>
              <p className="text-xs text-gray-500 mt-1">{sortedProducts[0]?.sales} items sold</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('sales')}
                  >
                    <div className="flex items-center justify-end">
                      Sales
                      {sortBy === 'sales' && (
                        <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('revenue')}
                  >
                    <div className="flex items-center justify-end">
                      Revenue
                      {sortBy === 'revenue' && (
                        <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('avgRating')}
                  >
                    <div className="flex items-center justify-end">
                      Rating
                      {sortBy === 'avgRating' && (
                        <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.category === 'Classic Milktea Series' ? 'bg-amber-100 text-amber-800' : 
                          product.category === 'Specialty Drinks' ? 'bg-purple-100 text-purple-800' : 
                          product.category === 'Fruit Tea Series' ? 'bg-green-100 text-green-800' : 
                          product.category === 'Coffee Series' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      {product.sales} items
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      ₱{product.revenue.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-amber-500">
                          {Array(Math.floor(product.avgRating)).fill().map((_, i) => (
                            <Icon key={i} name="Star" className="w-4 h-4 inline" />
                          ))}
                          {product.avgRating % 1 >= 0.5 && <Icon name="StarHalf" className="w-4 h-4 inline" />}
                        </span>
                        <span className="ml-1">{product.avgRating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      {product.trend === 'up' ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <Icon name="TrendingUp" className="w-4 h-4 mr-1" />
                          Up
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <Icon name="TrendingDown" className="w-4 h-4 mr-1" />
                          Down
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                // Export data as CSV
                const headers = ['Product', 'Category', 'Sales', 'Revenue', 'Stock', 'Trend'];
                const rows = sortedProducts.map(product => 
                  [product.name, product.category, product.sales, product.revenue.toFixed(2), product.stock, product.trend]
                );
                
                const csvContent = [headers, ...rows].map(row => row.join(',')).join('\\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `product_sales_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center gap-2 text-sm"
            >
              <Icon name="Download" className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSalesAnalytics;