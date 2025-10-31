import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TaskFilterProps {
  filter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange, taskCounts }) => {
  const { theme } = useTheme();
  
  const filters = [
    { key: 'all' as const, label: 'All', count: taskCounts.all },
    { key: 'pending' as const, label: 'Pending', count: taskCounts.pending },
    { key: 'completed' as const, label: 'Complete', count: taskCounts.completed },
  ];
  
  return (
    <div className={`p-4 rounded-xl border ${
      theme === 'dark'
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white/70 border-gray-200'
    } backdrop-blur-sm`}>
      <div className="flex gap-2">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};