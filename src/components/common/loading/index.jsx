import React from 'react';

const Loading = () => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
            <div className='absolute flex items-center justify-center gap-10'>
                <img src='/images/jump.gif' className='w-40' alt='' />
                <p className='mt-10 text-20 font-light tracking-widest text-gray-98'>Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
