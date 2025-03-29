import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPackage, FiUsers, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransparencyDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  
  // Sample data
  const dashboardData = {
    totalFunds: 1250000,
    utilizedFunds: 875000,
    beneficiaries: 12500,
    completedOperations: 8,
    ongoingOperations: 5,
    fundAllocation: {
      emergency: 45,
      medical: 25,
      infrastructure: 20,
      admin: 10
    },
    shipments: [
      { id: 1, destination: 'Nepal', status: 'delivered', items: '320 tents', lat: 27.7172, lng: 85.3240 },
      { id: 2, destination: 'Ukraine', status: 'transit', items: '5 medical trucks', lat: 50.4501, lng: 30.5234 },
      { id: 3, destination: 'Sudan', status: 'pending', items: '2 food shipments', lat: 15.5007, lng: 32.5599 }
    ]
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 1800000);
    return () => clearInterval(interval);
  }, []);

  // Lazy load the globe component
  useEffect(() => {
    import('react-globe.gl').then(() => {
      setGlobeLoaded(true);
    });
  }, []);

  // Chart data
  const fundAllocationData = {
    labels: ['Emergency Relief', 'Medical Aid', 'Infrastructure', 'Admin'],
    datasets: [{
      data: Object.values(dashboardData.fundAllocation),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  };

  // Metric Card Component
  const MetricCard = ({ icon, title, value, change, color }) => {
    const colorClasses = {
      blue: 'text-blue-500 bg-blue-100',
      green: 'text-green-500 bg-green-100',
      orange: 'text-orange-500 bg-orange-100',
      purple: 'text-purple-500 bg-purple-100'
    };

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          <h3 className="text-md font-medium text-gray-700">{title}</h3>
        </div>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    );
  };

  // Shipment Status Component
  const ShipmentStatus = ({ destination, status, items }) => {
    const statusClasses = {
      delivered: 'bg-green-100 text-green-800',
      transit: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-red-100 text-red-800'
    };

    return (
      <div className="border rounded-lg p-3 hover:shadow-sm transition-all">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{destination}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
            {status}
          </span>
        </div>
        <p className="text-gray-600 mt-1 text-sm">{items}</p>
      </div>
    );
  };

  // Globe component (only rendered when loaded)
  const GlobeComponent = globeLoaded ? React.lazy(() => import('react-globe.gl')) : () => (
    <div className="h-[500px] flex items-center justify-center">Loading globe...</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Transparency Dashboard</h1>
            <p className="text-gray-600">Track our relief efforts in real-time</p>
          </div>
          <button 
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Last updated: {lastUpdated.toLocaleString()}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard 
            icon={<FiDollarSign size={20} />}
            title="Total Funds"
            value={`$${(dashboardData.totalFunds / 1000000).toFixed(2)}M`}
            change="+12% this month"
            color="blue"
          />
          <MetricCard 
            icon={<FiPackage size={20} />}
            title="Funds Utilized"
            value={`${Math.round((dashboardData.utilizedFunds / dashboardData.totalFunds) * 100)}%`}
            change="87% deployed"
            color="green"
          />
          <MetricCard 
            icon={<FiUsers size={20} />}
            title="Lives Impacted"
            value={dashboardData.beneficiaries.toLocaleString()}
            change="320 families housed"
            color="orange"
          />
          <MetricCard 
            icon={<FiCheckCircle size={20} />}
            title="Completed Ops"
            value={dashboardData.completedOperations}
            change="5 in progress"
            color="purple"
          />
        </div>

        {/* Fund Allocation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Fund Allocation</h2>
          <div className="h-64">
            <Pie 
              data={fundAllocationData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}% ($${Math.round(dashboardData.totalFunds * context.raw / 100).toLocaleString()})`
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Global Aid Tracking */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Global Aid Network</h2>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> Delivered</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Transit</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Pending</span>
            </div>
          </div>
          
          <div className="h-[500px] relative">
            <React.Suspense fallback={<div className="h-full flex items-center justify-center">Loading globe...</div>}>
              {globeLoaded && (
                <GlobeComponent
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  backgroundColor="rgba(0,0,0,0)"
                  arcsData={dashboardData.shipments.map(ship => ({
                    startLat: 40.7128,
                    startLng: -74.0060,
                    endLat: ship.lat,
                    endLng: ship.lng,
                    color: ship.status === 'delivered' ? ['rgba(16, 185, 129, 0.7)'] : 
                           ship.status === 'transit' ? ['rgba(234, 179, 8, 0.7)'] : ['rgba(239, 68, 68, 0.7)']
                  }))}
                  arcColor={'color'}
                  arcDashLength={() => Math.random() * 0.2 + 0.1}
                  arcDashGap={() => Math.random() * 0.2 + 0.1}
                  arcDashAnimateTime={() => Math.random() * 4000 + 500}
                />
              )}
            </React.Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {dashboardData.shipments.map((shipment) => (
              <ShipmentStatus
                key={shipment.id}
                destination={shipment.destination}
                status={shipment.status}
                items={shipment.items}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Verified Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Financial Audit</h3>
              <p className="text-gray-600 text-sm">100% compliant with international standards</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold mb-1">Field Verification</h3>
              <p className="text-gray-600 text-sm">3rd party validation of all shipments</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-2">👁️</div>
              <h3 className="font-semibold mb-1">Donor Transparency</h3>
              <p className="text-gray-600 text-sm">See exactly how your donation was used</p>
            </div>
          </div>
        </div>

        {/* Impact Stories */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Impact Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 bg-blue-100"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rebuilding After the Earthquake</h3>
                <p className="text-gray-600 text-sm mb-2">Nepal received 320 tents for displaced families</p>
                <a href="#" className="text-blue-500 text-sm hover:underline">Read more →</a>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 bg-green-100"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Medical Aid Delivery</h3>
                <p className="text-gray-600 text-sm mb-2">5 medical trucks sent to Ukraine frontline</p>
                <a href="#" className="text-blue-500 text-sm hover:underline">Read more →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;