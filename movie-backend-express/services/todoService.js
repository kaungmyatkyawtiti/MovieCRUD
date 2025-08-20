const Todos = require("../models/Todo.js");

const getAllTodos = async () => {
  return Todos.find();
}

const getTodoById = async (todoId) => {
  return Todos.findById(todoId);
}

const saveTodo = async (todo) => {
  const newTodo = new Todos(todo);
  return newTodo.save();
}

const updateTodoById = async (todoId, todo) => {
  return Todos.findByIdAndUpdate(todoId, todo, { new: true });
}

const deleteTodoById = async (todoId) => {
  return Todos.findByIdAndDelete(todoId);
}

module.exports = {
  getAllTodos,
  getTodoById,
  saveTodo,
  updateTodoById,
  deleteTodoById,
}
