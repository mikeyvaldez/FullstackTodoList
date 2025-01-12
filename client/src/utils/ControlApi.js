export const addTodo = async (text) => {
  try {
    const res = await fetch("/api/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: text,
      }),
    });
    if (!res.ok) {
      console.log("Something went wrong");
    }
    if (res.ok) location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (setTodos) => {
  try {
    const res = await fetch("/api/todo/gettodos");
    const todo = await res.json();
    if (res.ok) {
      setTodos(todo);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (
  todoId,
  text,
  setTodos,
  setText,
  setIsUpdating
) => {
  try {
    const res = await fetch("/api/todo/updatetodos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: todoId, content: text }),
    })
      .then((data) => {
        setText("");
        setIsUpdating(false);
        getTodos(setTodos);
      })
      .then(location.reload())
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async () => {};
