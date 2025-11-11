import React from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, Users, CheckCircle, Link as LinkIcon, Settings, LogOut, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation = ({ isMobileOpen, setIsMobileOpen }) => {
  const { darkMode, theme } = useTheme();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp, path: '/overview' },
    { id: 'verification', label: 'Verification', icon: Users, path: '/verification' },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle, path: '/approvals' },
    { id: 'blockchain', label: 'Blockchain', icon: LinkIcon, path: '/blockchain' },
  ];

  const handleLogout = () => {
    alert('Logout clicked');
  };

  const handleSettings = () => {
    alert('Settings clicked');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Independent container */}
      <aside
        className={`
          w-64 flex-shrink-0 border-r ${theme.cardBg} ${theme.border}
          fixed lg:static inset-y-0 left-0 z-50
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile - Fixed */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b lg:hidden ${theme.border}">
            <span className={`font-semibold ${theme.text}`}>Menu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
              aria-label="Close menu"
            >
              <X size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </button>
          </div>

          {/* Navigation Links - Scrollable */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive 
                          ? `${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'} font-semibold` 
                          : `${theme.textMuted} ${theme.hover}`
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions - Fixed at bottom */}
          <div className={`flex-shrink-0 border-t px-4 py-4 space-y-2 ${theme.border}`}>
            <button
              onClick={handleSettings}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${theme.textMuted} ${theme.hover}`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${theme.textMuted} ${theme.hover}`}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
