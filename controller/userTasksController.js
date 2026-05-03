import TaskModel from "../models/tasks.js";
import UserModel from "../models/users.js";

export const getUsersController = async (req, res) => {
   try {
      const users = await UserModel.find({ role: 'user' }).select('-password');
      res.status(200).send({ success: true, message: 'Users retrieved successfully', users });
   } catch (error) {
      res.status(500).send({ success: false, message: 'Server error', error: error.message });
   }
}

export const getUserTasksController = async (req, res) => {
   try {
    const userId = req.user._id; // Assuming req.user is populated by the authentication middleware
   //  console.log('User ID in getUserTasksController: ', userId);
    const user = await UserModel.findOne({ _id: userId })
   //  console.log('User found in getUserTasksController: ', user);
    if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
    }
    const tasks = await TaskModel.find({ assignedTo: user.email });
    res.status(200).send({ success: true, message: 'User tasks retrieved successfully', tasks });
   } catch (error) {
    res.status(500).send({ success: false, message: 'Server while retrieving user tasks error', error: error.message });
   }
}

export const getUserTaskByIdController = async (req, res) => {
   try {
      const userId = req.user._id; // Assuming req.user is populated by the authentication middleware
      const user = await UserModel.findOne({ _id: userId })
      const taskId = req.params.id; // Get task ID from URL parameters
      const task = await TaskModel.findOne({ _id: taskId, assignedTo: user.email });
      if (!task) {
          return res.status(404).send({ success: false, message: 'Task not found' });
      }
      res.status(200).send({ success: true, message: 'User task retrieved successfully', task });

   } catch (error) {
       res.status(500).send({ success: false, message: 'Server while getting user task error', error: error.message });
   }
}

export const updateUserTaskByIdController = async (req, res) => {
   try {
      const userId = req.user._id; // Assuming req.user is populated by the authentication middleware
      const user = await UserModel.findOne({ _id: userId })
      const taskId = req.params.id; // Get task ID from URL parameters
      const { status } = req.body; // Get updated status from request body
      const task = await TaskModel.findOneAndUpdate(
         { _id: taskId, assignedTo: user.email }, // Find task by ID and assigned user
         { status }, // Update the status
         { new: true } // Return the updated task
      );
      console.log('Updated Task status: ', task.status);
      if(task.status === 'Completed') {
         await TaskModel.findByIdAndUpdate(taskId, { status: 'Completed' }, { new: true });
         
      }
      if (!task) {
          return res.status(404).send({ success: false, message: 'Task not found or not assigned to user' });
      }
      res.status(200).send({ success: true, message: 'User task updated successfully', task });

   } catch (error) {
       res.status(500).send({ success: false, message: 'Server while updating user task error', error: error.message });
   }
}