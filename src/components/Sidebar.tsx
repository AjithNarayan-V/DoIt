import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilter } from '../store/slices/taskSlice';
import { ListTodo, Calendar, Star, Users, Plus, PieChart } from 'lucide-react';
import TaskProgress from './TaskProgress';
import { isToday } from 'date-fns';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.auth.user);

  const filters = [
    { id: 'all', label: 'All Tasks', icon: ListTodo },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'important', label: 'Important', icon: Star },
    { id: 'planned', label: 'Planned', icon: PieChart },
    { id: 'assigned', label: 'Assigned to Me', icon: Users },
  ];

  const getTaskCount = (filterId: string) => {
    return tasks.filter(task => {
      switch (filterId) {
        case 'all':
          return true;
        case 'today':
          return task.dueDate ? isToday(new Date(task.dueDate)) : false;
        case 'important':
          return task.important;
        case 'planned':
          return !!task.dueDate;
        case 'assigned':
          return task.category === 'assigned';
        default:
          return true;
      }
    }).length;
  };

  return (
    <aside className="w-full sm:w-64  bg-[#EEF6EF] dark:bg-gray-800 h-[90vh] sm:h-[95vh] p-4 flex flex-col transition-colors duration-200">

      <div className="flex-col justify-center mx-auto items-center space-x-3">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
          alt={user?.name || 'User'}
          className="h-20 w-20 rounded-full"
        />

      </div>
      <p className="text-balance pb-4 text-center font-medium text-gray-700 dark:text-gray-200">
        {/* toupper */}
        Hey,  {user?.name.toUpperCase() || 'User'}
      </p>
      <nav className="flex-1 bg-white dark:bg-gray-700 p-4 rounded-lg">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const count = getTaskCount(filter.id);

          return (
            <button
              key={filter.id}
              onClick={() => {
                dispatch(setFilter(filter.id as any));
              }}
              className={`w-full flex items-center p-2 rounded-lg mb-2 transition-colors duration-200 ${currentFilter === filter.id
                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-[#f3f6f3] dark:hover:bg-gray-700'
                }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{filter.label}</span>
              <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-sm">
                {count}
              </span>
            </button>
          );
        })}
      </nav>
      <button className=" flex bg-white my-4 items-center p-2 text-green-600 dark:text-green-400 hover:bg-blue-50 dark:hover:bg-green-900 dark:bg-gray-700 rounded-lg transition-colors duration-200">
        <Plus className="w-5 w-5 mr-2" />
        Add List
      </button>
      <div className="mb-8">
        <TaskProgress tasks={tasks} />
      </div>

    </aside>
  );
};

export default Sidebar;
