import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET /api/tasks - Get all tasks with optional filtering
router.get('/', async (req, res) => {
  try {
    const { filter, sort = '-createdAt' } = req.query;
    let query = {};

    // Apply filter
    if (filter === 'completed') {
      query.completed = true;
    } else if (filter === 'pending') {
      query.completed = false;
    }

    const tasks = await Task.find(query).sort(sort);
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks',
      message: error.message
    });
  }
});

// GET /api/tasks/stats - Get task statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Task.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
});

// GET /api/tasks/:id - Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task',
      message: error.message
    });
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Task title is required'
      });
    }

    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : ''
    });

    const savedTask = await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create task',
      message: error.message
    });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Error updating task:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update task',
      message: error.message
    });
  }
});

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: `Task marked as ${updatedTask.completed ? 'completed' : 'pending'}`,
      data: updatedTask
    });
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle task',
      message: error.message
    });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task',
      message: error.message
    });
  }
});

// DELETE /api/tasks - Delete all tasks (useful for development)
router.delete('/', async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} tasks`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete tasks',
      message: error.message
    });
  }
});

export default router;