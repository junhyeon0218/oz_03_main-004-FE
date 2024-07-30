import React, { useEffect } from 'react';
import alertSuccess from '../../../assets/images/alertSuccess.png';
import alertWarn from '../../../assets/images/alertWarn.png';

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
            <img src={type === 'success' ? alertSuccess : alertWarn} alt={type} className='w-20 h-20' />
            <p className='text-white text-16'>{text}</p>
        </div>
    );
};

export default Alert;
