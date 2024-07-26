import React from 'react';

const PotatoInfoModal = ({ isOpen, image, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='relative flex h-267 w-546 animate-slide-up flex-col justify-around overflow-hidden rounded-4 bg-white p-10 shadow-custom-dark'>
                <div className='text-center'>
                    <h1 className='mt-10 text-28 font-bold text-strong'>Potato Information</h1>
                </div>
                <div className='mt-4 text-center'>
                    <p className='mt-2 text-16 text-primary'>Information about the selected potato: {image}</p>
                </div>
                <div className='mt-6'></div>
                <div className='mt-6 flex justify-center space-x-4'>
                    <button
                        onClick={onClose}
                        className='ml-5 h-33 w-100 rounded-4 bg-primary px-10 py-5 text-14 text-white duration-200 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
                <img
                    className='absolute bottom-[-100px] right-[-100px] h-[300.53px] w-[243.09px] origin-top-left rotate-[17.03deg] opacity-20'
                    src='/potato.svg'
                    alt='Potato'
                />
            </div>
        </div>
    );
};

export default PotatoInfoModal;
