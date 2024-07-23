import React, { useEffect, useState } from 'react'; // React와 필요한 hooks import
import useCalendar from '../../../hooks/useCalendar'; // 커스텀 캘린더 hook
import { subMonths, addMonths, format } from 'date-fns'; // 날짜 관련 유틸리티 함수
import left from '../../../../public/button/left.svg'; // 왼쪽 화살표 이미지
import right from '../../../../public/button/right.svg'; // 오른쪽 화살표 이미지
import useDate from '../../../store/store'; // 날짜 상태 관리 store
import { fetchCompletedCounts } from '../../../api/axios'; // API 함수 import

const Calendar = () => {
    // useCalendar hook을 사용하여 캘린더 관련 상태와 함수 가져오기
    const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
    // useDate store에서 선택된 날짜 상태와 setter 함수 가져오기
    const { selectedDate, setSelectedDate } = useDate((state) => state);
    // // 완료된 할 일 개수를 저장할 state
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
            const formattedDate = format(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                'yyyy-MM-dd'
            );
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
        <div className='flex h-full flex-col'>
            <div className='flex w-full justify-between'>
                <h1 className='text-20 font-bold leading-30'>Calendar</h1>
                <div className='flex w-auto justify-between'>
                    <div
                        className='flex min-w-40 grow cursor-pointer items-center justify-center'
                        onClick={handlePrevMonth}
                    >
                        <img src={left} alt='' className='w-8' />
                    </div>

                    <div className='flex w-100 items-baseline justify-center'>
                        <p className='h-24 text-20 font-bold'>{format(currentDate, 'MMM.')}</p>
                        <p className='text-16'>{format(currentDate, 'yyyy')}</p>
                    </div>
                    <div
                        className='flex min-w-40 grow cursor-pointer items-center justify-center'
                        onClick={handleNextMonth}
                    >
                        <img src={right} alt='' className='w-8' />
                    </div>
                </div>
            </div>

            <div className='mt-30 flex w-full border-b-1 border-strong'>
                {DAY_LIST.map((day, index) => (
                    <div key={index} className='flex w-[calc(100%/7)] items-center justify-center'>
                        <p className={index === 0 ? 'text-red' : index === 6 ? 'text-blue' : ''}>{day}</p>
                    </div>
                ))}
            </div>

            <div className='mt-6 flex w-full grow flex-col'>
                {weekCalendarList.map((week, weekIndex) => (
                    <div key={weekIndex} className='flex h-[calc(100%/6)] w-full'>
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className='flex w-full cursor-pointer items-center justify-center shadow-custom-light'
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
