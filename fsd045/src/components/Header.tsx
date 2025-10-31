import React from 'react';
import { Moon, Sun, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrentTime } from '../hooks/useCurrentTime';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const currentTime = useCurrentTime();
  
  return (
    <header className={`p-6 rounded-xl border mb-8 ${
      theme === 'dark'
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white/70 border-gray-200'
    } backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-blue-400 to-purple-400'
              : 'from-blue-600 to-purple-600'
          } bg-clip-text text-transparent`}>
            FSD Practical
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your tasks efficiently
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/70'
          }`}>
            <Clock size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-sm font-mono ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};