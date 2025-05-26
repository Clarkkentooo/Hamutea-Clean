import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Icon from '@components/common/Icon';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [salesData, setSalesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  
  // Generate dates for labels
  const generateDateLabels = (range) => {
    const labels = [];
    const today = new Date();
    
    switch(range) {
      case 'day':
        // Last 24 hours in 2-hour intervals
        for (let i = 0; i < 12; i++) {
          const hour = new Date(today);
          hour.setHours(today.getHours() - (11 - i) * 2);
          labels.push(`${hour.getHours()}:00`);
        }
        break;
      case 'week':
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const day = new Date(today);
          day.setDate(today.getDate() - i);
          labels.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        break;
      case 'month':
        // Last 30 days in 5-day intervals
        for (let i = 0; i < 6; i++) {
          const day = new Date(today);
          day.setDate(today.getDate() - 30 + i * 5);
          labels.push(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        break;
      case 'year':
        // Last 12 months
        for (let i = 11; i >= 0; i--) {
          const month = new Date(today);
          month.setMonth(today.getMonth() - i);
          labels.push(month.toLocaleDateString('en-US', { month: 'short' }));
        }
        break;
      default:
        break;
    }
    
    return labels;
  };
  
  // Generate random sales data
  const generateSalesData = (range) => {
    const labels = generateDateLabels(range);
    
    // Generate current period data
    const currentData = labels.map(() => Math.floor(Math.random() * 5000) + 1000);
    
    // Generate previous period data for comparison
    const previousData = labels.map(() => Math.floor(Math.random() * 5000) + 1000);
    
    // Calculate totals
    const currentTotal = currentData.reduce((sum, val) => sum + val, 0);
    const previousTotal = previousData.reduce((sum, val) => sum + val, 0);
    const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    
    return {
      labels,
      datasets: [
        {
          label: 'Current Period',
          data: currentData,
          borderColor: '#D91517',
          backgroundColor: 'rgba(217, 21, 23, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Previous Period',
          data: compareMode ? previousData : [],
          borderColor: '#666',
          backgroundColor: 'rgba(102, 102, 102, 0.1)',
          tension: 0.4,
          fill: true,
          hidden: !compareMode,
        }
      ],
      summary: {
        currentTotal: currentTotal.toFixed(2),
        previousTotal: previousTotal.toFixed(2),
        percentChange: percentChange.toFixed(2)
      }
    };
  };
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = generateSalesData(timeRange);
      setSalesData(data);
      setLoading(false);
    }, 800);
  }, [timeRange, compareMode]);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₱${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₱' + value.toLocaleString();
          }
        }
      }
    }
  };
  
  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];
  
  return (
    <div className="border border-hamutea-border rounded-2xl p-5 w-full">
      <div className="border-b border-hamutea-border pb-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold">Sales Analytics</h2>
          
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
            
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${
                compareMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon name="BarChart2" className="w-4 h-4" />
              Compare
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading sales data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-hamutea-red">₱{salesData.summary?.currentTotal}</p>
              {compareMode && (
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${Number(salesData.summary?.percentChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(salesData.summary?.percentChange) >= 0 ? '+' : ''}{salesData.summary?.percentChange}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs previous period</span>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Average Sale</p>
              <p className="text-2xl font-bold text-hamutea-blue">
                ₱{(Number(salesData.summary?.currentTotal) / salesData.labels?.length).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">per {timeRange === 'day' ? 'hour' : timeRange === 'week' ? 'day' : timeRange === 'month' ? '5 days' : 'month'}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Peak Sales</p>
              <p className="text-2xl font-bold text-hamutea-green">
                ₱{Math.max(...salesData.datasets[0].data).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                on {salesData.labels[salesData.datasets[0].data.indexOf(Math.max(...salesData.datasets[0].data))]}
              </p>
            </div>
          </div>
          
          <div className="h-80">
            <Line options={chartOptions} data={salesData} />
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                // Export data as CSV
                const headers = ['Date', 'Sales'];
                if (compareMode) headers.push('Previous Period');
                
                const rows = salesData.labels.map((label, i) => {
                  const row = [label, salesData.datasets[0].data[i]];
                  if (compareMode) row.push(salesData.datasets[1].data[i]);
                  return row;
                });
                
                const csvContent = [headers, ...rows].map(row => row.join(',')).join('\\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `sales_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`;
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

export default SalesAnalytics;