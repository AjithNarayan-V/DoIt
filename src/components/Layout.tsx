import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import logo from './logo.png';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className={`fixed z-40 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:max-h-screen lg:static lg:w-64 shadow-md ${
            window.innerWidth < 1024 ? 'w-full h-full' : 'w-64'
          }`}
        >
          <div className="flex items-center justify-between p-3">
            <img src={logo} alt="logo" className="h-8 w-25 top-0" />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen && window.innerWidth >= 1024 ? 'ml-' : 'ml-0'
        }`}
      >
        {/* Mobile menu button for closed sidebar */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed left-4 top-2 flex justify-center items-center gap-2 z-50 p-2 dark:bg-gray-800 rounded-lg"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <img onClick={() => window.location.href = '/'} src={logo} alt="logo" className="h-8 w-25" />
          </button>
        )}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4">
          {/* Add your content here */}
          <TaskInput />
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Layout;
