import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={`h-screen flex flex-col ${theme.bg}`}>
      {/* Header - Fixed at top */}
      <Header onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
      
      {/* Main container with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Navigation 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
        />
        
        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
