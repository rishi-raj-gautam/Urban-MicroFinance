import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import { useTheme } from '../context/ThemeContext';
import { stats, repaymentData, portfolioData, loansByPurpose, riskDistribution } from '../data/mockData';

const Overview = () => {
  const { theme, darkMode } = useTheme();

  // Convert stats object to array for StatCard
  const statsArray = [
    {
      icon: DollarSign,
      label: 'Total Capital',
      value: `₹${(stats.totalCapital / 100000).toFixed(1)}L`,
      change: `+${stats.capitalChange}%`,
      negative: false
    },
    {
      icon: Users,
      label: 'Active Loans',
      value: stats.activeLoans.toString(),
      change: `+${stats.loansChange}`,
      negative: false
    },
    {
      icon: CheckCircle,
      label: 'Repayment Rate',
      value: `${stats.repaymentRate}%`,
      change: `+${stats.repaymentChange}%`,
      negative: false
    },
    {
      icon: AlertCircle,
      label: 'Default Rate',
      value: `${stats.defaultRate}%`,
      change: `${stats.defaultChange}%`,
      negative: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className={`text-3xl font-bold ${theme.text}`}>Dashboard Overview</h1>
        <p className={`${theme.textMuted} mt-1`}>Track your lending portfolio performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsArray.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Repayment Trends */}
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Repayment Trends</h3>
          <p className={`text-sm ${theme.textMuted} mb-4`}>Actual vs Expected monthly repayments</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={repaymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#111827'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="expected" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10b981', r: 4 }}
                name="Expected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Growth */}
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Portfolio Growth</h3>
          <p className={`text-sm ${theme.textMuted} mb-4`}>Total portfolio value over time</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#111827'
                }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution of Active Loans - Pie Chart with gaps and rounded corners */}
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Distribution of Active Loans</h3>
          <p className={`text-sm ${theme.textMuted} mb-4`}>Loans categorized by purpose</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loansByPurpose}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ purpose, percent }) => `${purpose} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="count"
                paddingAngle={5}
                cornerRadius={10}
              >
                {loansByPurpose.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Risk Distribution</h3>
          <p className={`text-sm ${theme.textMuted} mb-4`}>Portfolio risk analysis by percentage</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                type="number" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#111827'
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {riskDistribution.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Recent Activity</h3>
        <p className={`text-sm ${theme.textMuted} mb-4`}>Latest transactions and updates</p>
        <div className="space-y-3">
          {[
            { type: 'success', message: 'Loan #LA006 approved for ₹25,000', time: '2 hours ago' },
            { type: 'info', message: 'New verification request from Priya Sharma', time: '5 hours ago' },
            { type: 'warning', message: 'Payment pending for Loan #LA003', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${theme.subtle}`}>
              <div className={`p-2 rounded-lg ${
                activity.type === 'success' ? 'bg-green-500/10' :
                activity.type === 'warning' ? 'bg-yellow-500/10' :
                'bg-blue-500/10'
              }`}>
                {activity.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
                {activity.type === 'warning' && <AlertCircle className="text-yellow-500" size={20} />}
                {activity.type === 'info' && <Users className="text-blue-500" size={20} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme.text}`}>{activity.message}</p>
                <p className={`text-xs ${theme.textMuted} mt-1`}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
