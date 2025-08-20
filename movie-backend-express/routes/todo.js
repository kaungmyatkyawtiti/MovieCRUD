const express = require("express");
const router = express.Router();
const todos = require("../controllers/todoController.js");

router.get("/", todos.getAllTodos);
router.get("/:id", todos.getTodoById);
router.post("/", todos.saveTodo);
router.put("/:id", todos.updateTodoById);
router.delete("/:id", todos.deleteTodoById);

module.exports = router;
