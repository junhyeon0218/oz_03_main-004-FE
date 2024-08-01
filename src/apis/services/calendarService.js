import { parse, format } from 'date-fns';

export const refineCompletedTodos = (data) => {
    return Object.entries(data).reduce((acc, [date, count]) => {
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        const yearMonth = format(parsedDate, 'yyyy-MM');
        const day = format(parsedDate, 'd');

        if (!acc[yearMonth]) {
            acc[yearMonth] = {};
        }
        acc[yearMonth][day] = count;
        return acc;
    }, {});
};
