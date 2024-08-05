import React, { useEffect } from 'react';

const Alert = ({ text, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`absolute bottom-20 right-20 flex h-45 w-auto items-center justify-evenly rounded-8 px-20 py-12 ${type === 'success' ? 'bg-[#1BCC73]' : 'bg-[#F54025]'}`}
        >
            <img
                src={`/images/${type === 'success' ? 'alertSuccess.png' : 'alertWarn.png'}`}
                alt={type}
                className='h-20 w-20'
            />
            <p className='text-16 text-white'>{text}</p>
        </div>
    );
};

export default Alert;
