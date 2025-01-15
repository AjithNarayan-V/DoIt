import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import { toggleGrid } from '../store/slices/authSlice';
import { logout } from '../store/slices/authSlice';
import { Search, Bell, Sun, Moon, LogOut, Menu, Grid2X2 } from 'lucide-react';
import { setSearchQuery } from '../store/slices/taskSlice';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className=" flex flex-col sm:flex-row items-center justify-self-end sm:px-6 py-3">
        <div className="flex items-center gap-4 w-full ">
          {/* <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button> */}
          <div className="flex-1 hidden sm:block  max-w-xl spce-x-4 pr-4 ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleGrid())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Grid2X2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>



          <button
            onClick={() => dispatch(logout())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

      </div>
      <div className="flex-1 block sm:hidden  max-w-xl py-2  px-4 ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
    </header>
  );
};

export default Header;