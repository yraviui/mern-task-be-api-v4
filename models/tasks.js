import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: [ 'backlog', 'pending', 'in-progress', 'completed'], default: 'backlog' },
    // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    assignedTo: { type: String, require: true, ref: 'users' }
}, { timestamps: true });

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;

/* { "title": "Task1 Title", "description": "Task1 Description" } */