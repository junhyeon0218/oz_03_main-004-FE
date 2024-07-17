import React from 'react';
import useCalendar from '../../../hooks/useCalendar';
import { subMonths, addMonths, format } from 'date-fns';
import left from '../../../../public/button/left.svg';
import right from '../../../../public/button/right.svg';
import useDate from '../../../store/store';

const Calendar = () => {
    const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
    const { selectedDate, setSelectedDate } = useDate((state) => state);

    console.log(selectedDate);

    const DAY_LIST = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleDateClick = (day) => {
        console.log(day);
        if (day !== 0) {
            setSelectedDate(day);
        }
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between w-full'>
                <h1 className='font-bold text-20 leading-30'>Calendar</h1>
                <div className='flex'>
                    <div className='flex items-center justify-center w-16'>
                        <img src={left} alt='' onClick={handlePrevMonth} className='w-1/2 cursor-pointer' />
                    </div>

                    <div className='flex items-baseline justify-center mx-20 w-100'>
                        <p className='h-24 font-bold text-20'>{format(currentDate, 'MMM.')}</p>
                        <p className='text-16'>{format(currentDate, 'yyyy')}</p>
                    </div>
                    <div className='flex items-center justify-center w-16'>
                        <img src={right} alt='' onClick={handleNextMonth} className='w-1/2 cursor-pointer' />
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
                            <div key={dayIndex} className='flex items-center justify-center w-full'>
                                <p
                                    className={`${dayIndex === 0 ? 'text-red' : dayIndex === 6 ? 'text-blue' : ''} flex h-48 w-48 cursor-pointer items-center justify-center rounded-full`}
                                    onClick={() => handleDateClick(day)}
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
