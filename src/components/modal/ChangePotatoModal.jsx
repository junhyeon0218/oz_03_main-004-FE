import React from 'react';

const ChangePotatoModal = ({ isOpen, onClose, selectedImage, onConfirm }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        // 선택된 이미지를 부모 컴포넌트로 전달
        onConfirm(selectedImage);
        onClose();
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex h-127 w-465 animate-slide-up flex-col rounded-4 bg-white p-16 shadow-custom-dark'>
                <div className='justify- start flex'>
                    <h1 className='text-20 font-bold'>Would you like to change the potato?</h1>
                </div>
                <div className='flex-grow'></div>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='h-33 w-80 rounded-4 bg-white px-10 py-5 text-14 text-black shadow-custom-light duration-200 hover:scale-105'
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirm}
                        className='ml-9 h-33 w-70 rounded-4 bg-primary px-10 py-5 text-14 text-white duration-200 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePotatoModal;
