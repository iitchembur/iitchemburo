import { useState, useEffect } from 'react';
import { Task, TaskStats } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      
      if (data.success) {
        // Convert date strings back to Date objects
        const tasksWithDates = data.data.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
        setTasks(tasksWithDates);
      } else {
        setError(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Initial data fetch and periodic refresh
  useEffect(() => {
    fetchTasks();
    fetchStats();

    // Refresh data every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchTasks();
      fetchStats();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  const addTask = async (title: string, description: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const newTask = {
          ...data.data,
          createdAt: new Date(data.data.createdAt),
          completedAt: data.data.completedAt ? new Date(data.data.completedAt) : undefined,
        };
        setTasks(prev => [newTask, ...prev]);
        fetchStats(); // Refresh stats
      } else {
        setError(data.error || 'Failed to create task');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedTask = {
          ...data.data,
          createdAt: new Date(data.data.createdAt),
          completedAt: data.data.completedAt ? new Date(data.data.completedAt) : undefined,
        };
        setTasks(prev =>
          prev.map(task => task.id === id ? updatedTask : task)
        );
        fetchStats(); // Refresh stats
      } else {
        setError(data.error || 'Failed to update task');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error toggling task:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        fetchStats(); // Refresh stats
      } else {
        setError(data.error || 'Failed to delete task');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    stats,
    refetch: fetchTasks,
  };
}