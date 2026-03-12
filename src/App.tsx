import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<div className="p-4">준비 중인 목록 페이지입니다.</div>} />
          {/* 향후 경로 추가:
          <Route path="write" element={<Write />} />
          <Route path="detail/:id" element={<Detail />} />
          */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
