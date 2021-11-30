/* eslint-disable import/extensions */
import TaskService from '../services/tasks.services.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskService.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

