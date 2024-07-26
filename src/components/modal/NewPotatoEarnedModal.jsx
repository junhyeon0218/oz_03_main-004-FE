import React from 'react';

const NewPotatoEarnedModal = ({ isOpen, onClose }) => {
    // if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex h-416 w-731 flex-col justify-around rounded-4 bg-white shadow-custom-dark'>
                <div className='relative flex flex-grow flex-col justify-between'>
                    <div className='mt-30 flex justify-center'>
                        <p className='rounded-25 border border-primary px-15 py-5 text-20'>potato name</p>
                    </div>
                    <div className='absolute bottom-115 z-50 flex w-full translate-y-1/2 transform gap-25 px-100'>
                        <img src='/images/star-icon.svg' alt='' className='h-73 w-73 animate-twinkle' />
                        <img src='/images/star-icon.svg' alt='' className='h-73 w-73 animate-twinkle' />
                        <img src='/collection/basicpotato.svg' alt='' className='h-191 w-152 animate-bounce' />
                        <img src='/images/star-icon.svg' alt='' className='h-73 w-73 animate-twinkle' />
                        <img src='/images/star-icon.svg' alt='' className='h-68 w-73 animate-twinkle' />
                    </div>
                    <div className='relative z-40'>
                        <img src='/images/grass.svg' alt='' className='h-73 w-full' />
                    </div>
                </div>
                <div className='flex h-124 w-full flex-col items-center'>
                    <h1 className='mt-10 text-28 font-bold text-strong'>New Potato Acquired!</h1>
                    <button
                        onClick={onClose}
                        className='my-15 h-33 w-70 rounded-4 bg-primary px-10 py-5 text-14 text-white duration-200 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPotatoEarnedModal;
