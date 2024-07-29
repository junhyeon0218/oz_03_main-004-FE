import React from 'react';

const ChangePotatoModal = ({ isOpen, onClose, selectedImage, onConfirm }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        // 선택된 이미지를 부모 컴포넌트로 전달
        onConfirm(selectedImage);
        onClose();
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' onClick={onClose}>
            <div className='flex flex-col p-16 bg-white h-127 w-465 animate-slide-up rounded-4 shadow-custom-dark'>
                <div className='flex justify- start'>
                    <h1 className='font-bold text-20'>Would you like to change the potato?</h1>
                </div>
                <div className='flex-grow'></div>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='px-10 py-5 text-black duration-200 bg-white h-33 w-80 rounded-4 text-14 shadow-custom-light hover:scale-105'
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirm}
                        className='px-10 py-5 text-white duration-200 ml-9 h-33 w-70 rounded-4 bg-primary text-14 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePotatoModal;
