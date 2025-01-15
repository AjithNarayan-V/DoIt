import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/taskSlice';
import { Plus, BellIcon, RepeatIcon } from 'lucide-react';

const TaskInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [setReminder, setSetReminder] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        important: false,
        favorite: false,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        category: 'all',
        createdAt: new Date(),
        setReminder: setReminder,
        repeat: repeat,
      })
    );

    setTitle('');
    setDueDate('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);

    // Adjust textarea height based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // Set max height to 200px
      )}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-[#EEF6EF] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-col items-center space-x-4">
        <div className="flex-1 border-b border-gray-300">
          <textarea
            ref={textareaRef}
            value={title}
            autoFocus
            onChange={handleInputChange}
            placeholder="Add a new task..."
            className="w-full overflow-y-auto px-4 py-2 rounded-lg bg-transparent dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none resize-none overflow-hidden "
            rows={1} // Default row count
            style={{
              maxHeight: '200px', // Maximum height
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 mt-5 justify-between items-start sm:items-center">
          <div className="space-x-4 flex items-center">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-900 rounded-lg dark:border-gray-600 bg-transparent dark:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* bell icon icon */}
            <BellIcon onClick={() => setSetReminder(!setReminder)} className={`${setReminder ? 'text-red-500 dark:text-red-500 bg-red-100' : ' '}h-5 w-5 text-gray-500 dark:text-gray-400`} />
            <RepeatIcon  onClick={() => setRepeat(!repeat)} className={`${repeat ? 'text-red-500  dark:text-red-500 bg-red-100' : ' '}h-5 w-5 text-gray-500 dark:text-gray-400`}  />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#80c988] text-green-800 rounded-2xl hover:bg-[#67e075] focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
