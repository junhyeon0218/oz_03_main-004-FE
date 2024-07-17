import React from 'react';
import { getDaysInMonth, startOfMonth, addDays } from 'date-fns';

const DATE_MONTH_FIXER = 1;
const CALENDAR_LENGTH = 42;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

const useCalendar = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const totalMonthDays = getDaysInMonth(currentDate);

    // 현재 달의 첫 번째 날을 가져옵니다.
    const firstDayOfMonth = startOfMonth(currentDate);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 이전 달의 날짜를 채웁니다.
    const prevDayList = Array.from({
        length: firstDayOfWeek,
    }).map(() => DEFAULT_TRASH_VALUE);

    // 현재 달의 날짜를 채웁니다.
    const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);

    // 다음 달의 날짜를 채웁니다.
    const nextDayList = Array.from({
        length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
    }).map(() => DEFAULT_TRASH_VALUE);

    // 전체 캘린더 리스트를 만듭니다.
    const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

    // 주 단위로 캘린더 리스트를 나눕니다.
    const weekCalendarList = currentCalendarList.reduce((acc, cur, idx) => {
        const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(cur);
        return acc;
    }, []);

    return {
        weekCalendarList,
        currentDate,
        setCurrentDate,
    };
};

export default useCalendar;
