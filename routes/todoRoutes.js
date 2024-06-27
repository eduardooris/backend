const express = require("express");
const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByDueDate,
    getTodosByPriority,
    getTodosByStatus,
    getTodosByUser,
} = require("../controllers/todoController");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.get("/todos", authMiddleware, getTodos);
router.get("/todos/:id", authMiddleware, getTodo);
router.post("/todos", authMiddleware, createTodo);
router.patch("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);
router.get("/todos/due-date/:dueDate", authMiddleware, getTodosByDueDate);
router.get("/todos/priority/:priority", authMiddleware, getTodosByPriority);
router.get("/todos/status/:status", authMiddleware, getTodosByStatus);
router.get("/todos/user", authMiddleware, getTodosByUser);
module.exports = router;