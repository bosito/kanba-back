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

export const addTask = async (req, res, next) => {
  try {
    const { title, description, due_date, user_id, status_id, after_task } = req.body;
    const taskObj = {
      title,
      description,
      due_date,
      user_id,
      status_id,
      after_task
    };
    const task = await TaskService.add(taskObj);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await TaskService.update(req.body, id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};
