import { useState } from 'react';
import PageTitle from "@features/admin/components/PageTitle";
import SalesAnalytics from "@features/admin/dashboard/components/SalesAnalytics";
import ProductSalesAnalytics from "@features/admin/dashboard/components/ProductSalesAnalytics";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('sales');
  
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-5 justify-between mb-6">
        <PageTitle title="Analytics" desc="Sales and Product Performance Analytics" />
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'sales' ? 'text-hamutea-red border-b-2 border-hamutea-red' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales Analytics
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'text-hamutea-red border-b-2 border-hamutea-red' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('products')}
          >
            Product Analytics
          </button>
        </div>
      </div>
      
      {activeTab === 'sales' ? (
        <SalesAnalytics />
      ) : (
        <ProductSalesAnalytics />
      )}
    </div>
  );
};

export default Analytics;