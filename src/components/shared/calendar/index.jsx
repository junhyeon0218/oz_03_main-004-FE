import React, { useEffect, useState } from 'react';
import useCalendar from '../../../hooks/useCalendar';
import { subMonths, addMonths, format } from 'date-fns';
import left from '/button/left.svg';
import right from '/button/right.svg';
import useDate from '../../../store/store';
import { fetchCompletedCounts } from '../../../api/axios';

const Calendar = () => {
    const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
    // useDate store에서 선택된 날짜 상태와 setter 함수 가져오기
    const { selectedDate, setSelectedDate } = useDate((state) => state);
    // 완료된 할 일 개수를 저장할 state
    const [completedCounts, setCompletedCounts] = useState({});

    const fetchData = async () => {
        try {
            const yearMonth = format(currentDate, 'yyyy-MM');
            const data = await fetchCompletedCounts(yearMonth);
            setCompletedCounts(data);
            console.log(yearMonth, data);
        } catch (error) {
            console.error('Failed to fetch completed counts:', error);
        }
    };
    // currentDate가 변경될 때마다 API 호출
    useEffect(() => {
        fetchData();
    }, [currentDate]);

    // 요일 목록
    const DAY_LIST = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 이전 달로 이동하는 함수
    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    // 다음 달로 이동하는 함수
    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    // 날짜 클릭 시 선택된 날짜 업데이트 함수
    const handleDateClick = (day) => {
        if (day !== 0) {
            const formattedDate = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), 'MM-dd');
            setSelectedDate(formattedDate);
        }
    };

    const getBackgroundColor = (count) => {
        if (count >= 10) return 'bg-[#421D06]';
        if (count >= 8) return 'bg-[#743A13]';
        if (count >= 6) return 'bg-[#8B4513]';
        if (count >= 4) return 'bg-[#AD5A10]';
        if (count >= 1) return 'bg-[#AD5A10] bg-opacity-50';
        return '';
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between w-full'>
                <h1 className='font-bold text-20 leading-30'>Calendar</h1>
                <div className='flex justify-between w-auto'>
                    <div
                        className='flex items-center justify-center cursor-pointer min-w-40 grow'
                        onClick={handlePrevMonth}
                    >
                        <img src={left} alt='' className='w-12' />
                    </div>

                    <div className='flex items-baseline justify-center w-100'>
                        <p className='h-24 font-bold text-20'>{format(currentDate, 'MMM.')}</p>
                        <p className='text-16'>{format(currentDate, 'yyyy')}</p>
                    </div>
                    <div
                        className='flex items-center justify-center cursor-pointer min-w-40 grow'
                        onClick={handleNextMonth}
                    >
                        <img src={right} alt='' className='w-12' />
                    </div>
                </div>
            </div>

            <div className='flex w-full mt-30 border-b-1 border-strong'>
                {DAY_LIST.map((day, index) => (
                    <div key={index} className='flex w-[calc(100%/7)] items-center justify-center'>
                        <p className={index === 0 ? 'text-red' : index === 6 ? 'text-blue' : ''}>{day}</p>
                    </div>
                ))}
            </div>

            <div className='flex flex-col w-full mt-6 grow'>
                {weekCalendarList.map((week, weekIndex) => (
                    <div key={weekIndex} className='flex h-[calc(100%/6)] w-full'>
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className='flex items-center justify-center w-full cursor-pointer'
                                onClick={() => handleDateClick(day)}
                            >
                                <p
                                    className={` ${dayIndex === 0 ? 'text-red' : dayIndex === 6 ? 'text-blue' : ''} flex h-48 w-48 cursor-pointer items-center justify-center rounded-full ${getBackgroundColor(completedCounts[day] || 0)} ${completedCounts[day] > 0 ? 'text-white' : ''} `}
                                >
                                    {day !== 0 ? day : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
