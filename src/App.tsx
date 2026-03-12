import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Write from './pages/Write';
import Map from './pages/Map';
import PWABadge from './components/PWABadge';

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="write" element={<Write />} />
            <Route path="map" element={<Map />} />
          </Route>
        </Routes>
        
        {/* PWA 업데이트 알림 배지 */}
        <PWABadge />
      </div>
    </Router>
  );
};

export default App;
