import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPackage, FiUsers, FiCheckCircle, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Correct dynamic imports for chart libraries
const Chart = dynamic(() => import('react-chartjs-2').then((mod) => ({
  Pie: mod.Pie,
  Sankey: mod.Sankey || (() => null), // Fallback if Sankey isn't available
})), { ssr: false });

const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Loading globe...</div>
});

const TransparencyDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  const dashboardData = {
    totalFunds: 1250000,
    utilizedFunds: 875000,
    aidPackages: 42,
    deliveredPackages: 31,
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

  const fundAllocationData = {
    labels: ['Emergency Relief', 'Medical Aid', 'Infrastructure', 'Admin'],
    datasets: [{
      data: Object.values(dashboardData.fundAllocation),
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444'
      ],
      borderWidth: 0
    }]
  };

  const sankeyData = {
    nodes: [
      { name: 'Donations', color: '#3B82F6' },
      { name: 'Emergency Relief', color: '#10B981' },
      { name: 'Medical Aid', color: '#F59E0B' },
      { name: 'Infrastructure', color: '#EF4444' },
      { name: 'Admin', color: '#8B5CF6' },
      { name: 'Field Operations', color: '#EC4899' }
    ],
    links: [
      { source: 0, target: 1, value: 45 },
      { source: 0, target: 2, value: 25 },
      { source: 0, target: 3, value: 20 },
      { source: 0, target: 4, value: 10 },
      { source: 1, target: 5, value: 45 },
      { source: 2, target: 5, value: 25 }
    ]
  };

  // Helper components moved outside main component
  const MetricCard = ({ icon, title, value, change, glowColor }) => {
    const glowClasses = {
      blue: 'shadow-blue-200/50 hover:shadow-blue-200',
      green: 'shadow-green-200/50 hover:shadow-green-200',
      orange: 'shadow-orange-200/50 hover:shadow-orange-200',
      purple: 'shadow-purple-200/50 hover:shadow-purple-200'
    };

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg ${glowClasses[glowColor]} hover:shadow-xl transition-all`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-opacity-20 bg-${glowColor}-100`}>
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        </div>
        <p className="text-3xl font-bold mb-2">{value}</p>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    );
  };

  const TrustBadge = ({ title, description, icon }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const ImpactStory = ({ image, title, location, excerpt, link }) => (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <a href={link} className="text-blue-500 hover:underline">Read full story →</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Transparency Dashboard</h1>
            <p className="text-gray-600">Every penny, every step - in real time</p>
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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          Last updated: {lastUpdated.toLocaleString()}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard 
            icon={<FiDollarSign className="text-blue-500" size={24} />}
            title="Total Funds"
            value={`$${(dashboardData.totalFunds / 1000000).toFixed(2)}M`}
            change="+12% this month"
            glowColor="blue"
          />
          <MetricCard 
            icon={<FiPackage className="text-green-500" size={24} />}
            title="Funds Utilized"
            value={`${Math.round((dashboardData.utilizedFunds / dashboardData.totalFunds) * 100)}%`}
            change="87% deployed"
            glowColor="green"
          />
          <MetricCard 
            icon={<FiUsers className="text-orange-500" size={24} />}
            title="Lives Impacted"
            value={dashboardData.beneficiaries.toLocaleString()}
            change="320 families housed"
            glowColor="orange"
          />
          <MetricCard 
            icon={<FiCheckCircle className="text-purple-500" size={24} />}
            title="Completed Ops"
            value={dashboardData.completedOperations}
            change={`${dashboardData.ongoingOperations} in progress`}
            glowColor="purple"
          />
        </div>

        {/* Fund Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Money Flow */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Money in Motion</h2>
            <div className="h-64">
              {Chart?.Sankey ? (
                <Chart.Sankey 
                  data={sankeyData}
                  options={{
                    maintainAspectRatio: false,
                    color: (ctx) => ctx.dataset?.backgroundColor || sankeyData.nodes[ctx.dataIndex]?.color,
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Sankey chart not available
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Hover to trace fund pathways</p>
          </div>

          {/* Fund Allocation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Fund Allocation</h2>
            <div className="h-64">
              {Chart?.Pie ? (
                <Chart.Pie 
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
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Pie chart not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Aid Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Global Aid Network</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-sm"><span className="w-3 h-3 rounded-full bg-green-400"></span> Delivered</span>
              <span className="flex items-center gap-1 text-sm"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> In Transit</span>
              <span className="flex items-center gap-1 text-sm"><span className="w-3 h-3 rounded-full bg-red-400"></span> Pending</span>
            </div>
          </div>
          
          <div className="h-[500px] relative">
            <Globe
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {dashboardData.shipments.map((shipment) => (
              <div key={shipment.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{shipment.destination}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'transit' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shipment.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{shipment.items}</p>
                <button className="mt-3 text-sm text-blue-500 hover:underline">View documentation</button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-6">Verified Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TrustBadge 
              title="Financial Audit"
              description="100% compliant with international standards"
              icon="📊"
            />
            <TrustBadge 
              title="Field Verification"
              description="3rd party validation of all shipments"
              icon="🔍"
            />
            <TrustBadge 
              title="Donor Transparency"
              description="See exactly how your donation was used"
              icon="👁️"
            />
          </div>
        </div>

        {/* Impact Stories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Stories of Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImpactStory 
              image="https://source.unsplash.com/random/600x400/?refugee,help"
              title="Maria's New Beginning"
              location="Quito, Ecuador"
              excerpt="After losing her home in the earthquake, Maria received emergency shelter and school supplies for her children."
              link="#"
            />
            <ImpactStory 
              image="https://source.unsplash.com/random/600x400/?clinic,africa"
              title="Clinic in Kenya"
              location="Nairobi, Kenya"
              excerpt="Our medical truck delivered supplies to a rural clinic serving 500+ patients monthly."
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;