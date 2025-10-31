import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { TaskStats } from './components/TaskStats';
import { TaskFilter } from './components/TaskFilter';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const {
    tasks,
    allTasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    stats,
  } = useTasks();

  const taskCounts = {
    all: allTasks.length,
    pending: allTasks.filter(t => !t.completed).length,
    completed: allTasks.filter(t => t.completed).length,
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Form and Filter */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white/70 border-gray-200'
            } backdrop-blur-sm`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Add New Task
              </h2>
              <TaskForm onAddTask={addTask} />
            </div>
            
            <TaskFilter
              filter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
          </div>
          
          {error && (
            <div className={`p-4 rounded-xl border ${
              theme === 'dark'
                ? 'bg-red-900/20 border-red-700 text-red-400'
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              <p className="font-medium">Error: {error}</p>
            </div>
          )}
          
          {/* Right Column - Stats and Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <TaskStats stats={stats} />
            
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white/70 border-gray-200'
            } backdrop-blur-sm`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Tasks ({tasks.length})
              </h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className={`text-6xl mb-4 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    ⏳
                  </div>
                  <p className={`text-lg ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Loading tasks...
                  </p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className={`text-6xl mb-4 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    📝
                  </div>
                  <p className={`text-lg ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {filter === 'all' ? 'No tasks yet. Create your first task!' : 
                     filter === 'pending' ? 'No pending tasks. Great job!' :
                     'No completed tasks yet. Start checking off some tasks!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;