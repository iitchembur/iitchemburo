export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}