import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleComplete, toggleImportant, toggleFavorite, deleteTask } from '../store/slices/taskSlice';
import { Star, Trash2, Heart, Edit3 } from 'lucide-react';
import { format, isToday } from 'date-fns';
import TaskEditPanel from './TaskEditPanel';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector((state: RootState) => state.tasks);
  const { grid } = useSelector((state: RootState) => state.auth);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const openEditPanel = (task) => {
    setSelectedTask(task);
    setIsEditPanelOpen(true);
  };

  const closeEditPanel = () => {
    setIsEditPanelOpen(false);
    setSelectedTask(null);
  };

  // Filter tasks based on search query and filter type
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;

    switch (filter) {
      case 'all':
        matchesFilter = true;
        break;
      case 'today':
        matchesFilter = task.dueDate ? isToday(new Date(task.dueDate)) : false;
        break;
      case 'important':
        matchesFilter = task.important;
        break;
      case 'planned':
        matchesFilter = !!task.dueDate;
        break;
      case 'assigned':
        matchesFilter = task.category === 'assigned';
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const notCompletedTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const renderTask = (task) => (
    <div
      key={task.id}
      className={`flex flex-wrap items-center px-4 py-2 bg-white dark:bg-inherit border rounded-md ${task.completed ? 'border-green-200 dark:border-green-900' : 'dark:border-gray-700'
        }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleComplete(task.id))}
        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <div className="ml-4 flex-1 min-w-0">
        <p
          className={`text-sm font-medium break-words overflow-y-auto ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'
            }`}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </p>
        )}
      </div>
  
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <button
          onClick={() => dispatch(toggleFavorite(task.id))}
          className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${task.favorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'
            }`}
        >
          <Heart className="h-5 w-5" />
        </button>
  
        <button
          onClick={() => dispatch(toggleImportant(task.id))}
          className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${task.important ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-300'
            }`}
        >
          <Star className="h-5 w-5" />
        </button>
  
        <button
          onClick={() => openEditPanel(task)}
          className="p-1 text-gray-400 dark:text-gray-300 hover:text-green-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Edit3 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
  
  const renderTaskGrid = (task) => (
    <div
      key={task.id}
      className="p-4 bg-white dark:bg-inherit border rounded-lg shadow-sm max-w-full"
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleComplete(task.id))}
        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <div className="mt-2 min-w-0">
        <p
          className={`text-sm scrollbar-thin font-medium overflow-y-auto ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'
            }`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex justify-between mt-4 items-start flex-wrap">
        {task.dueDate && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </p>
        )}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => dispatch(toggleFavorite(task.id))}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${task.favorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'
              }`}
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={() => dispatch(toggleImportant(task.id))}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${task.important ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-300'
              }`}
          >
            <Star className="h-5 w-5" />
          </button>
          <button
            onClick={() => openEditPanel(task)}
            className="p-1 text-gray-400 dark:text-gray-300 hover:text-green-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit3 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="p-6">
      {/* Not Completed Tasks */}
      {notCompletedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tasks</h2>
          <div className={grid ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
            {notCompletedTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {grid ? renderTaskGrid(task) : renderTask(task)}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Completed</h2>
          {completedTasks.map((task) => (
            <React.Fragment key={task.id}>
              {renderTask(task)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Edit Panel */}
      {isEditPanelOpen && <TaskEditPanel task={selectedTask} onClose={closeEditPanel} />}
    </div>
  );
};

export default TaskList;
