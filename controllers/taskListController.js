const TaskList = require('../models/TaskList');

exports.getTaskLists = async (req, res) => {
    try {
        const taskLists = await TaskList.find();
        res.status(200).json(taskLists);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar listas de tarefas." });
    }
}

exports.getTaskList = async (req, res) => {
    try {
        const taskList = await TaskList.findById(req.params.id);
        if (!taskList) {
            return res.status(404).json({ message: "Lista de tarefas não encontrada." });
        }
        res.status(200).json(taskList);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar lista de tarefas." });
    }
}

exports.createTaskList = async (req, res) => {
    const { name, color } = req.body;
    if (!name) {
        return res.status(400).json({ message: "O nome é obrigatório." });
    }

    try {
        const taskList = await TaskList.create({ name, color, createdBy: req.user.id });
        res.status(201).json({ message: "Lista de tarefas criada.", taskList });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar lista de tarefas." });
    }
}

exports.updateTaskList = async (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;

    if (!name) {
        return res.status(400).json({ message: "O nome é obrigatório." });
    }

    try {
        const taskList = await TaskList.findById(id);
        if (!taskList) {
            return res.status(404).json({ message: "Lista de tarefas não encontrada." });
        }

        await TaskList.updateOne({ _id: id }, { name, color });
        res.status(200).json({ message: "Lista de tarefas atualizada." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar lista de tarefas." });
    }
}

exports.deleteTaskList = async (req, res) => {
    try {
        await TaskList.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Lista de tarefas deletada." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar lista de tarefas." });
    }
}

exports.getTaskListTodos = async (req, res) => {
    try {
        const taskList = await TaskList.findById(req.params.id).populate('todos');
        if (!taskList) {
            return res.status(404).json({ message: "Lista de tarefas não encontrada." });
        }
        res.status(200).json(taskList.todos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas da lista." });
    }
}
