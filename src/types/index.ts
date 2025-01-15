export interface Task {
  id: string;
  title: string;
  completed: boolean;
  important: boolean;
  favorite: boolean;
  dueDate?: Date;
  category: 'all' | 'today' | 'important' | 'planned' | 'assigned';
  createdAt: Date;
  setReminder: boolean;
  repeat: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  grid: boolean;

}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
  searchQuery: string;
}