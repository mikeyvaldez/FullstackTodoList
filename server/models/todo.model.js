import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },        
    }, { timestamps: true }
)

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;