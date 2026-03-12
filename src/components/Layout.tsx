import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col max-w-md mx-auto shadow-xl">
      <header className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center z-10">
        <Link to="/" className="text-xl font-bold text-orange-500">Foodiary</Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm font-medium hover:text-orange-500">홈</Link>
          <Link to="/list" className="text-sm font-medium hover:text-orange-500">목록</Link>
        </nav>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t p-4 text-center text-xs text-gray-500">
        &copy; 2026 Foodiary. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
