import React, { useState } from 'react';
import axios from 'axios';

const BaekjoonConnectModal = ({ isOpen, onClose, onSuccess }) => {
    const [baekjoonId, setBaekjoonId] = useState('');

    // 백준 ID 서버에 보내기
    const handleConnect = async () => {
        try {
            const response = await axios.post('/api/connect-baekjoon', { baekjoonId });
            //응답상태코드(성공)인경우
            if (response.status === 200) {
                alert('Baekjoon ID connected successfully');
                onClose();
            } else {
                alert('Failed to connect Baekjoon ID');
            }
        } catch (error) {
            console.error('Failed to connect Baekjoon ID', error);
            alert('Failed to connect Baekjoon ID. Please try again.');
        }
    };

    // 모달이 오픈되있지 않으면 렌더링 안함
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div
                className='relative flex flex-col justify-around p-10 overflow-hidden bg-white h-267 w-546 animate-slide-up rounded-4 shadow-custom-dark'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='text-center'>
                    <h1 className='mt-10 font-bold text-28 text-strong'>Connect with Baekjoon</h1>
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
                        placeholder='Id / Email'
                        value={baekjoonId}
                        onChange={(e) => setBaekjoonId(e.target.value)}
                        className='inline-flex h-50 w-full items-center justify-start gap-2.5 rounded-4 border bg-white px-16 py-15 focus:border-strong'
                    />
                </div>
                <div className='flex justify-center mt-6 space-x-4'>
                    <button
                        onClick={onClose}
                        className='px-10 py-5 mr-5 text-black duration-200 bg-white h-33 w-80 rounded-4 text-14 shadow-custom-light hover:scale-105'
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConnect}
                        className='px-10 py-5 ml-5 text-white duration-200 h-33 rounded-4 bg-primary text-14 hover:scale-105'
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
