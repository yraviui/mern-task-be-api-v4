import TaskModel from "../models/tasks.js";

export const createTaskController = async (req, res) => {
  // Implementation for creating a task
  const { title, description } = req.body;
    if (!title) {
      return res.status(400).send({ message: 'Title is required' });
    }
    if (!description) {
      return res.status(400).send({ message: 'Description is required' });
    }
    try {
      const newTask = await new TaskModel({ title, description }).save();
      res.status(201).send({ success: true, message: 'Task created successfully', task: newTask });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }

};

export const getTasksController = async (req, res) => {
    try {
        // const tasks = await TaskModel.find().populate('assignedTo', 'name email');
        const tasks = await TaskModel.find({});
        res.status(200).send({ success: true, message: 'Tasks retrieved successfully', tasks });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
    // Implementation for getting tasks
};

export const getTaskByIdController = async (req, res) => {
    const { id } = req.params;
    console.log('Task ID: ', id);
    try {
        const task = await TaskModel.findById({ _id: id });
        if (!task) {
            return res.status(404).send({ success: false, message: 'Task not found' });
        }
        res.status(200).send({ success: true, message: 'Task retrieved successfully', task });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Task ID: ', id);
        const { title, description, status, assignedTo } = req.body;
        if (!title) {
            return res.status(400).send({ message: 'Title is required' });
        }
        if (!description) {
            return res.status(400).send({ message: 'Description is required' });
        }
        const obj = { title: req.body.title, description: req.body.description, status: req.body.status, assignedTo: req.body.assignedTo }
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj , { new: true });
        res.status(200).send({ success: true, message: 'Task updated successfully', task: updatedTask });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
  // Implementation for updating a task
};

export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Task ID: ', id);
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ success: false, message: 'Task not found' });
        }
        res.status(200).send({ success: true, message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
     
  // Implementation for deleting a task
};