import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskState, Task } from '../../types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    
    toggleImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.favorite = !task.favorite;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleSetRemainder: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.setReminder = !task.setReminder;
      }
    },
    toggleRepeat: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.repeat = !task.repeat;
      }
    }
  },
});

export const {
  addTask,
  updateTask,
  toggleComplete,
  toggleImportant,
  toggleFavorite,
  deleteTask,
  setFilter,
  setSearchQuery,
  toggleSetRemainder,
  toggleRepeat,
} = taskSlice.actions;
export default taskSlice.reducer;