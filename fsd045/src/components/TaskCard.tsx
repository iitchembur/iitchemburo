import React from 'react';
import { Check, Trash2, Clock, Calendar } from 'lucide-react';
import { Task } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
      theme === 'dark'
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
        : 'bg-white/70 border-gray-200 hover:bg-white/90'
    } backdrop-blur-sm`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : theme === 'dark'
              ? 'border-gray-600 hover:border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <Check size={14} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold transition-all duration-200 ${
            task.completed
              ? `line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`
              : theme === 'dark'
              ? 'text-white'
              : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`mt-2 text-sm ${
              task.completed
                ? `line-through ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`
                : theme === 'dark'
                ? 'text-gray-300'
                : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className={`mt-3 flex items-center gap-4 text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Created {task.createdAt.toLocaleDateString()}</span>
            </div>
            
            {task.completedAt && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>Completed {task.completedAt.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};