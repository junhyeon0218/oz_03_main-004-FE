import { parseISO } from 'date-fns';

export const refineCompletedTodos = (data) => {
    const completedTodos = data.completed_todos || data;
    return Object.entries(completedTodos).reduce((acc, [date, count]) => {
        const parsedDate = parseISO(date);
        acc[date] = count;
        return acc;
    }, {});
};
