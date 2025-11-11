import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, XCircle, Clock, Eye, TrendingUp } from 'lucide-react';
import { pendingLoans } from '../data/mockData';

const Approvals = () => {
  const { theme, darkMode } = useTheme();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return theme.border;
    }
  };

  // Filter loans based on active tab (for now, all show pending data)
  const filteredLoans = pendingLoans; // You can add filtering logic here based on activeTab

  const totalPendingValue = pendingLoans.reduce((sum, loan) => sum + loan.amount, 0);

  // Tab configuration
  const tabs = [
    { id: 'pending', label: 'Pending', count: 3, icon: Clock },
    { id: 'approved', label: 'Approved', count: 1, icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', count: 1, icon: XCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Pending Approval</p>
              <p className={`text-xl font-bold ${theme.text}`}>
                Total value: ₹{totalPendingValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Approved Today</p>
              <p className={`text-xl font-bold ${theme.text}`}>₹20,000 disbursed</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <TrendingUp className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Avg. Approval Time</p>
              <p className={`text-xl font-bold ${theme.text}`}>2.3h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className={`flex gap-3 p-2 rounded-lg ${theme.cardBg} border ${theme.border} w-fit`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
              activeTab === tab.id
                ? darkMode
                  ? 'bg-white/10 text-white'
                  : 'bg-gray-900 text-white'
                : `${theme.textMuted} ${theme.hover}`
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : darkMode
                  ? 'bg-white/5 text-gray-400'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${theme.text}`}>
          {activeTab === 'pending' && 'Pending Loan Applications'}
          {activeTab === 'approved' && 'Approved Loan Applications'}
          {activeTab === 'rejected' && 'Rejected Loan Applications'}
        </h2>
        <p className={`${theme.textMuted} mt-1`}>
          Review and approve loan requests with AI recommendations
        </p>
      </div>

      {/* Table */}
      <div className={`rounded-xl border overflow-hidden ${theme.border} ${theme.cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-white/5' : 'bg-gray-100/60'}`}>
              <tr>
                {['Loan ID', 'Borrower', 'Purpose', 'Amount', 'Interest', 'Credit Score', 'Risk', 'AI Score', 'Actions'].map(
                  (header) => (
                    <th key={header} className={`px-4 py-3 text-left text-sm font-semibold ${theme.text}`}>
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/10">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className={theme.hover}>
                  <td className={`px-4 py-4 text-sm font-medium ${theme.text}`}>{loan.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                        }`}
                      >
                        {loan.borrower
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme.text}`}>{loan.borrower}</p>
                        <p className={`text-xs ${theme.textMuted}`}>{loan.borrowerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.text}`}>{loan.purpose}</td>
                  <td className={`px-4 py-4 text-sm font-semibold ${theme.text}`}>
                    ₹{loan.amount.toLocaleString()}
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.text}`}>{loan.interest}% p.a.</td>
                  <td className={`px-4 py-4 text-sm font-semibold ${theme.text}`}>{loan.creditScore}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(loan.risk)}`}>
                      {loan.risk.charAt(0).toUpperCase() + loan.risk.slice(1)} Risk
                    </span>
                  </td>
                  <td className={`px-4 py-4 text-sm font-semibold ${theme.text}`}>85%</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
                    >
                      <Eye size={18} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl border ${theme.bg} ${theme.border}`}>
            <div className={`sticky top-0 p-6 border-b ${theme.bg} ${theme.border}`}>
              <h3 className={`text-xl font-bold ${theme.text}`}>Loan Application Review</h3>
              <p className={`${theme.textMuted} text-sm mt-1`}>
                Comprehensive review of loan application {selectedLoan.id}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Borrower Info */}
              <div className={`p-4 rounded-lg border ${theme.border} ${theme.subtle}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                      }`}
                    >
                      {selectedLoan.borrower
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${theme.text}`}>{selectedLoan.borrower}</h4>
                      <p className={`text-sm ${theme.textMuted}`}>{selectedLoan.borrowerId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${theme.text}`}>{selectedLoan.creditScore}</p>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(selectedLoan.risk)}`}
                    >
                      {selectedLoan.risk.charAt(0).toUpperCase() + selectedLoan.risk.slice(1)} Risk
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Purpose</p>
                  <p className={`font-medium ${theme.text}`}>{selectedLoan.purpose}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>KYC Status</p>
                  <p className="font-medium text-green-500">verified</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Loan Amount</p>
                  <p className={`font-semibold ${theme.text}`}>₹{selectedLoan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Interest Rate</p>
                  <p className={`font-semibold ${theme.text}`}>{selectedLoan.interest}% p.a.</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Tenure</p>
                  <p className={`font-semibold ${theme.text}`}>{selectedLoan.tenure} months</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Monthly EMI</p>
                  <p className={`font-semibold ${theme.text}`}>₹{selectedLoan.emi.toLocaleString()}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Total Repayment</p>
                  <p className={`font-semibold ${theme.text}`}>₹{selectedLoan.totalRepayment.toLocaleString()}</p>
                </div>
              </div>

              {/* AI Recommendation */}
              <div
                className={`p-4 rounded-lg border ${
                  darkMode ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-500/5'
                }`}
              >
                <h4 className={`font-semibold mb-2 ${theme.text}`}>AI Recommendation</h4>
                <p className={`text-sm ${theme.textMuted}`}>
                  Based on credit history, repayment patterns, and market data
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
                  <CheckCircle size={18} className="inline mr-2" />
                  Approve Loan
                </button>
                <button className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
                  <XCircle size={18} className="inline mr-2" />
                  Reject Loan
                </button>
                <button
                  onClick={() => setSelectedLoan(null)}
                  className={`px-4 py-3 rounded-lg border font-medium transition-colors ${theme.border} ${theme.text} ${theme.hover}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approvals;
