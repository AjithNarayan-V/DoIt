import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteTask,
    toggleImportant,
    updateTask,
} from '../store/slices/taskSlice';
import { X, Trash2, Check, Star, Calendar, Repeat, Bell, Edit3 } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    notes: string;
    dueDate?: string;
    setReminder: boolean;
    repeat: boolean;
    completed: boolean;
    important: boolean;
}

interface TaskEditPanelProps {
    task: Task;
    onClose: () => void;
}

const TaskEditPanel: React.FC<TaskEditPanelProps> = ({ task, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(task?.title || '');
    const [notes, setNotes] = useState(task?.notes || '');
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [reminder, setReminder] = useState(task?.setReminder || false);
    const [repeat, setRepeat] = useState(task?.repeat || false);

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            notes,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            setReminder: reminder,
            repeat,
        };
        dispatch(updateTask(updatedTask));
        onClose();
    };
    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        onClose();
    };
    return (
        <div className="fixed right-0 top-0 h-full w-full sm:w-1/3 dark:text-white bg-[#EEF6EF] dark:bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Edit Task</h2>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-green-700"
                    >
                        <Check className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-6">
                    {/* Title and Favorite */}
                    <div className="flex items-center justify-between">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            // onChange={() => dispatch(toggleComplete(task.id))}
                            className="mr-2"
                        />
                        <textarea
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="edit task..."
                        className="w-full overflow-y-auto h-32 px-4 py-2 rounded-lg bg-transparent dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none resize-none overflow-hidden"
                        rows={1} // Default row count
                        style={{
                          maxHeight: '200px', // Maximum height
                        }}
                      />
                        <button
                            onClick={() => dispatch(toggleImportant(task.id))}
                            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${task.important ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-300'
                                }`}
                        >
                            <Star className="h-5 w-5" />
                        </button>
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Add Step */}
                    <div className="flex items-center text-gray-600 hover:text-gray-900">
                        <Edit3 className="h-5 w-5 mr-2" />
                        <button>Add Step</button>
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Set Reminder */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 mr-2" />
                            <label className="text-sm font-medium">Set Reminder</label>
                        </div>
                        <input
                            type="checkbox"
                            checked={reminder}
                            onChange={() => setReminder(!reminder)}
                            className="ml-2"
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Add Due Date */}
                    <div>
                        <div className="flex items-center mb-1">
                            <Calendar className="h-5 w-5 mr-2" />
                            <label className="block text-sm font-medium">Add Due Date</label>
                        </div>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Repeat */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Repeat className="h-5 w-5 mr-2" />
                            <label className="text-sm font-medium">Repeat</label>
                        </div>
                        <input
                            type="checkbox"
                            checked={repeat}
                            onChange={() => setRepeat(!repeat)}
                            className="ml-2"
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Add Notes */}
                    <div>
                        <div className="flex items-center mb-1">
                            <Edit3 className="h-5 w-5 mr-2" />
                            <label className="block text-sm font-medium">Add Notes</label>
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes here..."
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded"
                >
                    <X className="h-5 w-5" />
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-white"
                >
                    <Trash2 className="h-5 w-5 text-red-600" />
                </button>
            </div>
        </div>
    );
};

export default TaskEditPanel;
