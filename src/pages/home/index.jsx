import React from 'react';
import Calendar from '../../components/shared/calendar';
import Info from '../../components/shared/info';
import Potato from '../../components/shared/potato';
import Stack from '../../components/shared/stack';
import Todo from '../../components/shared/todo';

const Home = () => {
    return (
        <div className='flex h-[calc(100vh-100px)] w-full flex-col gap-30 px-10 py-20'>
            <div className='mx-auto flex h-1/3 w-[calc(100%-500px)] gap-30 wide:w-1400'>
                <div className='aspect-[6/5] h-full rounded-4 p-24 shadow-custom-dark'>
                    <Potato />
                </div>
                <div className='aspect-[12/5] h-full rounded-4 p-24 shadow-custom-dark'>
                    <Info />
                </div>
                <div className='h-full grow rounded-4 p-24 shadow-custom-dark'>
                    <Stack />
                </div>
            </div>

            <div className='mx-auto flex h-2/3 w-[calc(100%-500px)] gap-30 wide:w-1400'>
                <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                    <Calendar />
                </div>

                <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                    <Todo />
                </div>
            </div>
        </div>
    );
};

export default Home;
