import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
  user: req.user.id,
});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
  ...req.body,
  user: req.user.id,
});
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
