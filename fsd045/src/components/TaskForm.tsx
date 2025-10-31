import React from 'react';
import { Plus } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useTheme } from '../contexts/ThemeContext';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

interface FormValues {
  title: string;
  description: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const { theme } = useTheme();
  
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<FormValues>({
    initialValues: { title: '', description: '' },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      if (!values.title.trim()) {
        errors.title = 'Task title is required';
      }
      if (values.title.length > 100) {
        errors.title = 'Title must be less than 100 characters';
      }
      return errors;
    },
    onSubmit: (values) => {
      onAddTask(values.title.trim(), values.description.trim());
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter task title..."
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800/70'
              : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/90'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>
      
      <div>
        <textarea
          placeholder="Enter task description (optional)..."
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800/70'
              : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/90'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
      >
        <Plus size={20} />
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};