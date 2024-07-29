import { authInstance } from './instance';

export const todoAPI = {
    createTodo: async (task, date) => {
        const { data } = await authInstance.post('/todos/create', { task, date });
        return data;
    },

    updateTodo: async (todoId, task, date) => {
        const { data } = await authInstance.patch(`/todos/${todoId}/update`, { task, date });
        return data;
    },

    deleteTodo: async (todoId) => {
        await authInstance.delete(`/todos/${todoId}/delete`);
    },

    markTodoDone: async (todoId) => {
        const { data } = await authInstance.put(`/todos/${todoId}/done`);
        return data;
    },

    markTodoUndone: async (todoId) => {
        const { data } = await authInstance.put(`/todos/${todoId}/undone`);
        return data;
    },

    getTodayTodos: async () => {
        const { data } = await authInstance.get('/todos/today');
        return data;
    },

    getTodosByDate: async (date) => {
        const { data } = await authInstance.get(`/todos/${date}`);
        return data;
    },

    getMonthlyCompletionRate: async (year, month) => {
        const { data } = await authInstance.get(`/todos/completion_rate/${year}/${month}`);
        return data;
    },
};

// crud함수들이 전부 해당 투두 아이템 값 하나만 반환. -> 최신화가 늦어질 수 있다.
// export const todoAPI = {
//     createTodo: async (task, date) => {
//         const { data } = await authInstance.post('/todos/create', { task, date });
//         const updatedTodos = await todoAPI.getTodayTodos();
//         return { newTodo: data, allTodos: updatedTodos };
//     },

//     updateTodo: async (todoId, task, date) => {
//         const { data } = await authInstance.patch(`/todos/${todoId}/update`, { task, date });
//         const updatedTodos = await todoAPI.getTodayTodos();
//         return { updatedTodo: data, allTodos: updatedTodos };
//     },

//     deleteTodo: async (todoId) => {
//         await authInstance.delete(`/todos/${todoId}/delete`);
//         return await todoAPI.getTodayTodos();
//     },

//     markTodoDone: async (todoId) => {
//         const { data } = await authInstance.put(`/todos/${todoId}/done`);
//         const updatedTodos = await todoAPI.getTodayTodos();
//         return { updatedTodo: data, allTodos: updatedTodos };
//     },

//     markTodoUndone: async (todoId) => {
//         const { data } = await authInstance.put(`/todos/${todoId}/undone`);
//         const updatedTodos = await todoAPI.getTodayTodos();
//         return { updatedTodo: data, allTodos: updatedTodos };
//     },

//     // 기존 함수들은 그대로 유지
//     getTodayTodos: async () => {
//         const { data } = await authInstance.get('/todos/today');
//         return data;
//     },

//     // ... 기타 함수들
// }; 해당 방식으로 수정 가능

// 또는
//     try {
//     await todoAPI.deleteTodo(someId);
//     console.log('Todo successfully deleted');

//     // 최신 투두 리스트 가져오기
//     const updatedTodos = await todoAPI.getTodayTodos();
//     // UI 업데이트
//     updateTodoList(updatedTodos);
// } catch (error) {
//     console.error('Failed to delete todo or fetch updated list:', error);
// } 해당 함수처럼 사용
