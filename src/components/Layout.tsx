import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col min-h-screen relative">
        <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b p-4 flex justify-between items-center z-10">
          <Link to="/" className="text-2xl font-black text-orange-500 tracking-tighter italic">FOODIARY</Link>
          <div className="flex gap-1">
             {/* 간단한 알림이나 설정 아이콘 자리 */}
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-xs">🔔</span>
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 max-w-md w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t flex justify-around items-center py-3 z-20">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-orange-500' : 'text-gray-400'}`}>
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">홈</span>
          </Link>
          <Link to="/write" className={`flex flex-col items-center gap-1 ${isActive('/write') ? 'text-orange-500' : 'text-gray-400'}`}>
            <span className="text-xl">✍️</span>
            <span className="text-[10px] font-bold">작성</span>
          </Link>
          <Link to="/map" className={`flex flex-col items-center gap-1 ${isActive('/map') ? 'text-orange-500' : 'text-gray-400'}`}>
            <span className="text-xl">📍</span>
            <span className="text-[10px] font-bold">지도</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
