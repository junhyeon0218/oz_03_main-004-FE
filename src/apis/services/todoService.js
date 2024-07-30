import { todoAPI } from '../api/todo';

export const todoService = {
    getTodos: async (date) => {
        try {
            const todos = await todoAPI.getTodosByDate(date);
            return todos.map((todo) => ({
                id: todo.id,
                text: todo.task,
                completed: todo.is_Done,
                date: todo.date,
            }));
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            throw error;
        }
    },

    addTodo: async (text, date) => {
        try {
            const newTodo = await todoAPI.createTodo(text, date);
            return {
                id: newTodo.id,
                text: newTodo.task,
                completed: newTodo.is_Done,
                date: newTodo.date,
            };
        } catch (error) {
            console.error('Failed to add todo:', error);
            throw error;
        }
    },

    updateTodo: async (id, text, date) => {
        try {
            const updatedTodo = await todoAPI.updateTodo(id, text, date);
            return {
                id: updatedTodo.id,
                text: updatedTodo.task,
                completed: updatedTodo.is_Done,
                date: updatedTodo.date,
            };
        } catch (error) {
            console.error('Failed to update todo:', error);
            throw error;
        }
    },

    deleteTodo: async (id) => {
        try {
            await todoAPI.deleteTodo(id);
        } catch (error) {
            console.error('Failed to delete todo:', error);
            throw error;
        }
    },

    toggleTodoComplete: async (id, isDone) => {
        try {
            const updatedTodo = isDone ? await todoAPI.markTodoUndone(id) : await todoAPI.markTodoDone(id);
            return {
                id: updatedTodo.id,
                text: updatedTodo.task,
                completed: updatedTodo.is_Done,
                date: updatedTodo.date,
            };
        } catch (error) {
            console.error('Failed to toggle todo completion:', error);
            throw error;
        }
    },
};
