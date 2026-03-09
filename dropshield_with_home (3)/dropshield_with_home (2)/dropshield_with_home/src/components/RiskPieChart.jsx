// components/RiskPieChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RiskPieChart = ({ riskLevel = "Medium", percentage = 50 }) => {
  // Color mapping for each risk level
  const colorMap = {
    "Low": "#10b981",     // Green
    "Medium": "#f59e0b",  // Orange
    "High": "#ef4444"     // Red
  };

  // Prepare data - one segment for risk, one for remaining
  const data = [
    { name: `${riskLevel} Risk`, value: percentage, color: colorMap[riskLevel] },
    { name: 'Remaining', value: 100 - percentage, color: '#e5e7eb' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Student Risk Analysis
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Pie Chart */}
        <div className="relative w-48 h-48 mb-4 md:mb-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: colorMap[riskLevel] }}>
              {percentage}%
            </span>
            <span className="text-sm text-gray-600">{riskLevel} Risk</span>
          </div>
        </div>

        {/* Risk Details */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-3" 
              style={{ backgroundColor: colorMap[riskLevel] }}
            />
            <div>
              <p className="font-semibold text-gray-800">{riskLevel} Risk Level</p>
              <p className="text-sm text-gray-600">{percentage}% probability</p>
            </div>
          </div>
          
          <div className="text-gray-700">
            <p className="mb-1">Risk Factors:</p>
            <ul className="text-sm space-y-1">
              {riskLevel === "High" && (
                <>
                  <li>• High absenteeism rate</li>
                  <li>• Below average marks</li>
                  <li>• Multiple complaints</li>
                </>
              )}
              {riskLevel === "Medium" && (
                <>
                  <li>• Occasional absenteeism</li>
                  <li>• Average performance</li>
                  <li>• Few concerns noted</li>
                </>
              )}
              {riskLevel === "Low" && (
                <>
                  <li>• Regular attendance</li>
                  <li>• Good academic performance</li>
                  <li>• No complaints</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPieChart;