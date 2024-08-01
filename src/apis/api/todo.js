import { authInstance } from '../utils/instance';

export const todoAPI = {
    createTodo: async (task, date) => {
        const { data } = await authInstance.post('/todos/create/', { task, date });
        return data;
    },

    updateTodo: async (todoId, task, date) => {
        const { data } = await authInstance.patch(`/todos/${todoId}/update/`, { task, date });
        return data;
    },

    deleteTodo: async (todoId) => {
        await authInstance.delete(`/todos/${todoId}/delete/`);
    },

    markTodoDone: async (todoId) => {
        const { data } = await authInstance.patch(`/todos/${todoId}/done/`);
        return data;
    },

    markTodoUndone: async (todoId) => {
        const { data } = await authInstance.patch(`/todos/${todoId}/undone/`);
        return data;
    },

    getTodayTodos: async () => {
        const { data } = await authInstance.get('/todos/today/');
        return data;
    },

    getTodosByDate: async (date) => {
        const { data } = await authInstance.get(`/todos/${date}/`); //yyyy-mm-dd
        return data;
    },

    getMonthlyCompletionRate: async (year, month) => {
        const { data } = await authInstance.get(`/todos/completed/${year}/${month}/`); // yyyy // mm
        return data;
    },
};
