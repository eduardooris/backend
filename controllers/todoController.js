const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
}

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Tarefa não encontrada." });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefa." });
    }
}

exports.createTodo = async (req, res) => {
    const { title, description, status, dueDate, priority, public } = req.body;
    if (!title) {
        return res.status(400).json({ message: "O título é obrigatório." });
    }

    try {
        const todo = await Todo.create({ title, description, status, public, dueDate, priority, createdBy: req.user.id });
        res.status(201).json({ message: "Tarefa criada.", todo });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa." });
    }
}

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate, priority, public } = req.body;

    if (!title) {
        return res.status(400).json({ message: "O título é obrigatório." });
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Tarefa não encontrada." });
        }

        await Todo.updateOne({ _id: id }, { title, public, description, status, dueDate, priority });
        res.status(200).json({ message: "Tarefa atualizada." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Tarefa deletada." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar tarefa." });
    }
}

exports.getTodosByUser = async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
}

exports.getTodosByStatus = async (req, res) => {
    try {
        const todos = await Todo.find({ status: req.params.status });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
}

exports.getTodosByPriority = async (req, res) => {
    try {
        const todos = await Todo.find({ priority: req.params.priority });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
}

exports.getTodosByDueDate = async (req, res) => {
    try {
        const todos = await Todo.find({ dueDate: req.params.dueDate });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
}