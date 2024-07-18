import React, { useState } from 'react';
import useDate from '../../../store/store';

const TodoInput = () => {};

const Todo = () => {
    const [user, setUser] = useState(true);
    const selectedDate = useDate((state) => state.selectedDate);

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-20 font-bold leading-30'>Todo</h1>
                <p>{selectedDate}</p>
                {user ? (
                    <button className='flex h-30 w-80 items-center justify-center rounded-full shadow-custom-light'>
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
