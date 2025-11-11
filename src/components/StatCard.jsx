import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const StatCard = ({ icon: Icon, label, value, change, negative }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.cardBg} p-5 rounded-2xl border ${theme.border}`}>
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${theme.subtle} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex items-center gap-1 text-sm">
          {negative ? (
            <TrendingDown className="w-4 h-4 text-rose-500" />
          ) : (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          )}
          <span className={negative ? 'text-rose-500' : 'text-emerald-500'}>
            {change}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-2xl font-bold ${theme.text}`}>{value}</p>
        <p className={`text-sm ${theme.textMuted} mt-1`}>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
