const express = require("express");
const todoController = require("../controllers/todo.contoller");

const router = express.Router();
router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);
router
  .route("/:id")
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);
router.get("/users/:id", todoController.getUserTodos);

module.exports = router;
