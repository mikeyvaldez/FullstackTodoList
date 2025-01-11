import Todo from "../models/todo.model.js";

// -----Test-------------------------
export const test = (req, res) => {
  return res.json({ message: "Api is working!" });
};
// ------------end of test------------------

// ---------------CREATE A TODO--------------------------------------------------
export const createTodo = async (req, res, next) => {
  const content = req.body.content;
  Todo.create({
    content: content,
    userId: req.user.id,
  })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

export const getTodos = async (req, res) => {}
