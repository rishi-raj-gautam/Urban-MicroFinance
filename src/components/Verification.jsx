import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, XCircle, Eye, TrendingUp, FileText, Download } from 'lucide-react';
import { pendingLoans } from '../data/mockData';

const Verification = () => {
  const { theme, darkMode } = useTheme();
  const [selected, setSelected] = useState(null);

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

  const totalPendingValue = pendingLoans.reduce((s, l) => s + l.amount, 0);

  // KYC Documents data
  const kycDocuments = [
    {
      name: 'Aadhaar Card',
      type: 'Identity Proof',
      status: 'Uploaded',
      icon: FileText
    },
    {
      name: 'PAN Card',
      type: 'Tax ID Proof',
      status: 'Uploaded',
      icon: FileText
    },
    {
      name: 'Selfie with ID',
      type: 'Photo Verification',
      status: 'Uploaded',
      icon: FileText
    }
  ];

  const handleDownload = (docName) => {
    alert(`Downloading ${docName}...`);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Pending Verification</p>
              <p className={`text-2xl font-bold ${theme.text}`}>{pendingLoans.length}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Total Value</p>
              <p className={`text-2xl font-bold ${theme.text}`}>₹{totalPendingValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-amber-500/10">
              <TrendingUp className="text-amber-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Avg. Approval Time</p>
              <p className={`text-2xl font-bold ${theme.text}`}>2.3h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${theme.text}`}>Verification Queue</h2>
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
                {['Loan ID', 'Borrower', 'Purpose', 'Amount', 'Interest', 'Credit Score', 'Risk', 'Actions'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left text-sm font-semibold ${theme.text}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/10">
              {pendingLoans.map((loan) => (
                <tr key={loan.id} className={`${theme.hover}`}>
                  <td className={`px-4 py-4 text-sm font-medium ${theme.text}`}>{loan.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'}`}>
                        {loan.borrower.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme.text}`}>{loan.borrower}</p>
                        <p className={`text-xs ${theme.textMuted}`}>{loan.borrowerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-sm ${theme.text}`}>{loan.purpose}</td>
                  <td className={`px-4 py-4 text-sm font-semibold ${theme.text}`}>₹{loan.amount.toLocaleString()}</td>
                  <td className={`px-4 py-4 text-sm ${theme.text}`}>{loan.interest}% p.a.</td>
                  <td className={`px-4 py-4 text-sm font-semibold ${theme.text}`}>{loan.creditScore}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(loan.risk)}`}>
                      {loan.risk[0].toUpperCase() + loan.risk.slice(1)} Risk
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelected(loan)}
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
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl border ${theme.bg} ${theme.border}`}>
            <div className={`sticky top-0 p-6 border-b ${theme.bg} ${theme.border}`}>
              <h3 className={`text-xl font-bold ${theme.text}`}>Borrower Verification Details</h3>
              <p className={`${theme.textMuted} text-sm mt-1`}>
                Review KYC documents and borrower information
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Borrower Info */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-sm ${theme.textMuted}`}>Borrower ID</p>
                    <p className={`font-medium ${theme.text}`}>{selected.borrowerId}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme.textMuted}`}>Name</p>
                    <p className={`font-medium ${theme.text}`}>{selected.borrower}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${theme.textMuted}`}>Phone</p>
                    <p className={`font-medium ${theme.text}`}>+91 9876543210</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme.textMuted}`}>Credit Score</p>
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold ${theme.text}`}>{selected.creditScore}</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(selected.risk)}`}>
                        {selected.risk[0].toUpperCase() + selected.risk.slice(1)} Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Documents Section */}
              <div>
                <h4 className={`font-semibold mb-3 ${theme.text}`}>KYC Documents</h4>
                <div className="space-y-3">
                  {kycDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${theme.border} ${theme.cardBg}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <doc.icon size={20} className={theme.text} />
                        </div>
                        <div>
                          <p className={`font-medium ${theme.text}`}>{doc.name}</p>
                          <p className={`text-sm ${theme.textMuted}`}>{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          {doc.status}
                        </span>
                        <button
                          onClick={() => handleDownload(doc.name)}
                          className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
                          title="Download"
                        >
                          <Download size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Purpose</p>
                  <p className={`font-medium ${theme.text}`}>{selected.purpose}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>KYC Status</p>
                  <p className="font-medium text-green-500">Verified</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Loan Amount</p>
                  <p className={`font-semibold ${theme.text}`}>₹{selected.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Interest Rate</p>
                  <p className={`font-semibold ${theme.text}`}>{selected.interest}% p.a.</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Tenure</p>
                  <p className={`font-semibold ${theme.text}`}>{selected.tenure} months</p>
                </div>
                <div>
                  <p className={`text-sm ${theme.textMuted}`}>Total Repayment</p>
                  <p className={`font-semibold ${theme.text}`}>₹{selected.totalRepayment.toLocaleString()}</p>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-500/5'}`}>
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
                  onClick={() => setSelected(null)}
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

export default Verification;
