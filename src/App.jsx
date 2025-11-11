import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Overview from './components/Overview';
import Verification from './components/Verification';
import Approvals from './components/Approvals';
import Blockchain from './components/Blockchain';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="verification" element={<Verification />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="blockchain" element={<Blockchain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
