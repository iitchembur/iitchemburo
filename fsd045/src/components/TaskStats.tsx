import React from 'react';
import { CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { TaskStats as TaskStatsType } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const { theme } = useTheme();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className={`p-4 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/70 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <BarChart3 className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} size={20} />
          <div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.total}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Tasks
            </p>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/70 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <CheckCircle className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} size={20} />
          <div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.completed}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Completed
            </p>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/70 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <Circle className={theme === 'dark' ? 'text-orange-400' : 'text-orange-500'} size={20} />
          <div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.pending}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Pending
            </p>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/70 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
            theme === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
          }`}>
            %
          </div>
          <div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {Math.round(stats.completionRate)}%
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};