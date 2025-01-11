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
// ------------------------------------------------------------------------------

// ---------------------GET TODOS----------------------------------------------
export const getTodos = async (req, res, next) => {
  Todo.find()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
// -----------------------end of get todos---------------------------------------

// ------------------UPDATE TODOS--------------------------------------------------
export const updateTodos = async (req, res, next) => {
  const { _id, content } = req.body;
  Todo.findByIdAndUpdate(_id, { content })
    .then(() => res.send("Update Successfully"))
    .catch((err) => next(err));
};
// -----------------------end of update todos---------------------------------------

// ----------------------DELETE TODOS----------------------------------------------
export const deleteTodo = async (req, res, next) => {
  const { _id } = req.body;
  Todo.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Successfully..."))
    .catch((err) => next(err));
};
// ----------------------END OF DELETE TODO---------------------------------------
