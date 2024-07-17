import React, { useState } from 'react';
import useDate from '../../../store/store';

const Todo = () => {
    const [user, setUser] = useState(true);
    const selectedDate = useDate((state) => state.selectedDate);

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-20 leading-30'>Todo</h1>
                <p>{selectedDate}</p>
                {user ? (
                    <button className='flex items-center justify-center rounded-full h-30 w-80 shadow-custom-light'>
                        <img src='../../../../public/button/write.svg' alt='' />
                        <span className='ml-2 text-14 text-gray-98'>write</span>
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
            <div>todolist</div>
        </div>
    );
};

export default Todo;
