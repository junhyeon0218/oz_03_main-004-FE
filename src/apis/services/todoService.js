import { todoAPI } from '../api/todo';

export const todoService = {
    getTodos: async (date) => {
        try {
            const todos = await todoAPI.getTodosByDate(date);
            return todos.map((todo) => ({
                id: todo.id,
                task: todo.task,
                is_done: todo.is_done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            throw error;
        }
    },

    addTodo: async (task, date) => {
        try {
            await todoAPI.createTodo(task, date);
            const updatedTodos = await todoAPI.getTodosByDate(date);
            return updatedTodos.map((todo) => ({
                id: todo.id,
                task: todo.task,
                is_done: todo.is_done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to add todo:', error);
            throw error;
        }
    },

    updateTodo: async (id, task, date) => {
        try {
            await todoAPI.updateTodo(id, task, date);
            const updatedTodos = await todoAPI.getTodosByDate(date);
            return updatedTodos.map((todo) => ({
                id: todo.id,
                task: todo.task,
                is_done: todo.is_done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to update todo:', error);
            throw error;
        }
    },

    deleteTodo: async (id, date) => {
        try {
            await todoAPI.deleteTodo(id);
            const updatedTodos = await todoAPI.getTodosByDate(date);
            return updatedTodos.map((todo) => ({
                id: todo.id,
                task: todo.task,
                is_done: todo.is_done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to delete todo:', error);
            throw error;
        }
    },

    toggleTodoComplete: async (id, isDone, date) => {
        try {
            if (isDone) {
                await todoAPI.markTodoUndone(id);
            } else {
                await todoAPI.markTodoDone(id);
            }
            const updatedTodos = await todoAPI.getTodosByDate(date);
            return updatedTodos.map((todo) => ({
                id: todo.id,
                task: todo.task,
                is_done: todo.is_done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to toggle todo completion:', error);
            throw error;
        }
    },
};
