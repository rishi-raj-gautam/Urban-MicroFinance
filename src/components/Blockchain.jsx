import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link as LinkIcon, Copy, ExternalLink, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { blockchainTxns } from '../data/mockData';

const Blockchain = () => {
  const { theme, darkMode } = useTheme();
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const shortenHash = (hash) => {
    if (!hash) return 'Pending…';
    return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
  };

  const confirmed = blockchainTxns.filter((t) => t.status === 'confirmed').length;
  const totalGas = blockchainTxns
    .filter(t => t.gas)
    .reduce((s, t) => s + parseFloat(t.gas.split(' ')[0]), 0);

  const getStatusClass = (status) => {
    return status === 'confirmed'
      ? 'bg-green-500/10 text-green-500 border-green-500/20'
      : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${theme.text}`}>Blockchain Transactions</h2>
        <p className={`${theme.textMuted} mt-1`}>
          All transactions are recorded on Ethereum for transparency and immutability
        </p>
      </div>

      {/* Smart Contract Info */}
      <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-500/10'}`}>
              <LinkIcon className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Smart Contract</p>
              <p className={`font-mono font-semibold ${theme.text}`}>0xABC...xYZ</p>
            </div>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}>
            <ExternalLink className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Confirmed</p>
              <p className={`text-2xl font-bold ${theme.text}`}>{confirmed}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Pending</p>
              <p className={`text-2xl font-bold ${theme.text}`}>{blockchainTxns.length - confirmed}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <TrendingUp className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${theme.textMuted}`}>Total Gas Used</p>
              <p className={`text-2xl font-bold ${theme.text}`}>{totalGas.toFixed(4)} ETH</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Recent Transactions</h3>
        <p className={`${theme.textMuted} text-sm mb-4`}>
          All blockchain-verified loan and repayment transactions
        </p>

        <div className="space-y-3">
          {blockchainTxns.map((txn) => (
            <div
              key={txn.id}
              className={`p-4 rounded-xl border transition-all ${theme.border} ${theme.cardBg} ${theme.hover}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {txn.type === 'disbursement' ? (
                      <TrendingDown className="text-red-500" size={18} />
                    ) : (
                      <TrendingUp className="text-green-500" size={18} />
                    )}
                    <span className={`font-medium ${theme.text}`}>
                      {txn.borrower} • Loan {txn.loanId}
                    </span>
                  </div>
                  
                  <p className={`text-2xl font-bold mb-2 ${theme.text}`}>
                    {txn.type === 'disbursement' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                  </p>
                  
                  {txn.confirmations && (
                    <p className={`text-sm ${theme.textMuted}`}>
                      {txn.confirmations} confirmations
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(txn.status)}`}>
                    {txn.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100/60'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${theme.textMuted} mb-1`}>Transaction Hash</p>
                    <p className={`font-mono text-sm ${theme.text}`}>{shortenHash(txn.hash)}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(txn.hash || 'Pending')}
                    className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
                  >
                    {copied === txn.hash ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <Copy className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={16} />
                    )}
                  </button>
                </div>
                
                {txn.gas && (
                  <p className={`text-xs ${theme.textMuted} mt-2`}>
                    Gas: {txn.gas}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className={`p-4 rounded-lg border text-center ${darkMode ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-500/5'}`}>
        <p className={`text-sm ${theme.text}`}>
          🔒 All transactions are secured and immutable on Ethereum. Verify on Etherscan.
        </p>
      </div>
    </div>
  );
};

export default Blockchain;
