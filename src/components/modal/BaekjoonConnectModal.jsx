import React, { useState } from 'react';
import { authAPI } from '../../apis/api/auth';

const BaekjoonConnectModal = ({ isOpen, onClose, onSuccess, baekjoonId }) => {
    const [newBaekjoonId, setNewBaekjoonId] = useState('');

    const handleConnectBaekjoon = async () => {
        try {
            await authAPI.updateBaekjoonId(baekjoonId);
            onSuccess(newBaekjoonId);
            onClose();
        } catch (error) {
            console.error('Failed to connect Baekjoon ID', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div
                className='relative flex h-267 w-546 animate-slide-up flex-col justify-around overflow-hidden rounded-4 bg-white p-10 shadow-custom-dark'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='text-center'>
                    <h1 className='mt-10 text-28 font-bold text-strong'>Connect with Baekjoon</h1>
                </div>
                <div className='mt-4 text-center'>
                    <p className='mt-2 text-16 text-primary'>
                        Connect with Baekjoon and transform your problem-solving achievements into valuable rewards and
                        special experiences.
                    </p>
                </div>
                <div className='mt-6'>
                    <input
                        type='text'
                        placeholder={(baekjoonId && `Connected Baekjoon ID: ${baekjoonId}`) || 'Id / Email'}
                        value={newBaekjoonId}
                        onChange={(e) => setNewBaekjoonId(e.target.value)}
                        className='inline-flex h-50 w-full items-center justify-start gap-2.5 rounded-4 border bg-white px-16 py-15 focus:border-strong'
                    />
                </div>
                <div className='mt-6 flex justify-center space-x-4'>
                    <button
                        onClick={onClose}
                        className='mr-5 h-33 w-80 rounded-4 bg-white px-10 py-5 text-14 text-black shadow-custom-light duration-200 hover:scale-105'
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConnectBaekjoon}
                        className='ml-5 h-33 rounded-4 bg-primary px-10 py-5 text-14 text-white duration-200 hover:scale-105'
                    >
                        CONNECT
                    </button>
                </div>
                <img
                    className='absolute bottom-[-100px] right-[-100px] h-[300.53px] w-[243.09px] origin-top-left rotate-[17.03deg] opacity-20'
                    src='/images/potato.png'
                    alt=''
                />
            </div>
        </div>
    );
};

export default BaekjoonConnectModal;
