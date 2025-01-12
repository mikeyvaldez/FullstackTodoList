import { useEffect, useState } from "react";
import {
  getTodos,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../utils/ControlApi.js";
import ToDo from "../components/ToDo.jsx";
// import { BsCircleFill, BsFillCheckCircleFill, BsFillTrash2Fill } from "react-icons/bs";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  return (
    <div className="min-h-screen text-center mt-4">
      <div className="max-w-[600px] m-auto px-4 py-0">
        <span className="text-3xl font-bold text-green-400">Todo List</span>
        <div className="flex gap-4 justify-center mt-4">
          <input
            type="text"
            className="w-[500px] text-gray-200 bg-[rgb(16,23,42)] rounded"
            placeholder="Enter Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="bg-[#064aa3] text-white cursor-pointer transition-[0.3s] px-6 py-2 hover:bg-[#1bade7] rounded"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(todoId, text, setTodos, setText, setIsUpdating)
                : () => addTodo(text)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        {todos.map((todo) => (
          <ToDo
            key={todo._id}
            text={todo.content}
            updateMode={() => updateMode(todo._id, todo.content)}
            deleteTodo={() => deleteTodo(todo._id, setTodos)}
          />
        ))}
      </div>
    </div>
  );
}
