import React, { useEffect, useState } from 'react';
import axios from 'axios';

// PotatoInfoModal 컴포넌트 정의
const PotatoInfoModal = ({ isOpen, selectedImage, onClose, onOk, isOverlayed }) => {
    // 감자 정보 상태 선언
    const [potatoInfo, setPotatoInfo] = useState({ name: '', description: '' });

    // 컴포넌트가 마운트되거나 selectedImage가 변경될 때마다 실행되는 useEffect 훅
    useEffect(() => {
        // 감자 정보를 가져오는 비동기 함수
        const fetchPotatoInfo = async () => {
            try {
                // JSON 파일에서 감자 정보를 가져오기 위해 axios 사용
                const response = await axios.get('/src/assets/description.json');
                const potatoData = response.data;

                // selectedImage에서 파일 이름 추출 (파일 확장자 제거)
                const fileName = selectedImage.split('/').pop().split('.').slice(0, -1).join('.');

                // 파일 이름과 일치하는 감자 정보를 찾기
                const selectedPotato = potatoData.find((potato) => potato.name === fileName);

                if (selectedPotato) {
                    // 일치하는 감자 정보가 있으면 상태를 업데이트
                    setPotatoInfo(selectedPotato);
                } else {
                    // 일치하는 감자 정보가 없으면 기본 값을 설정
                    setPotatoInfo({ name: 'Unknown', description: 'No description available.' });
                }
            } catch (error) {
                // 에러 발생 시 콘솔에 에러 로그 출력
                console.error('Error fetching potato info:', error);
            }
        };

        // selectedImage가 있을 때만 감자 정보 가져오기
        if (selectedImage) {
            fetchPotatoInfo();
        }
    }, [selectedImage]); // selectedImage가 변경될 때마다 이 효과 실행

    // 모달이 열려 있지 않으면 null 반환 (모달 닫기)
    if (!isOpen) return null;

    // 모달 배경 클릭 시 모달 닫기 함수
    const handleBackgroundClick = (e) => {
        // 배경 클릭 시 모달이 닫히도록 설정
        if (e.target === e.currentTarget) {
            onClose(); // 배경 클릭 시 모달 닫기
        }
    };

    return (
        <div
            // 모달 배경 설정
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
            onClick={handleBackgroundClick} // 배경 클릭 시 handleBackgroundClick 함수 호출
        >
            <div className='relative flex flex-col justify-around overflow-hidden bg-white h-267 w-546 animate-slide-up rounded-4 p-30 shadow-custom-dark'>
                <div className='relative flex'>
                    {/* 선택된 감자 이미지 또는 Group.svg 표시 */}
                    <div className='relative flex-shrink-0 p-10 h-190 w-170'>
                        <img
                            // 감자 이미지 또는 Group.svg 이미지가 조건부로 렌더링됨
                            className={`h-full w-full object-cover ${isOverlayed ? 'opacity-30' : ''}`}
                            src={selectedImage}
                            alt='Selected Potato'
                        />
                        {/* isOverlayed가 true일 때 Group.svg 이미지로 오버레이 처리 */}
                        {isOverlayed && (
                            <div className='absolute inset-0 flex items-center justify-center rounded-4 bg-[#d9d9d9] bg-opacity-30 backdrop-blur-sm'>
                                <img src='/src/assets/images/Group.svg' alt='Overlay' className='h-100 w-100' />
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col ml-50'>
                        <div className='text-center'>
                            {/* 감자 이름 또는 Group.svg 제목 표시 */}
                            <h1 className='mt-10 font-bold text-28 text-strong'>
                                {isOverlayed ? 'Unlock' : potatoInfo.name}
                                {/* isOverlayed가 true일 때 'Unlock' 제목 표시 */}
                                {/* isOverlayed가 false일 때 감자 이름 표시 */}
                            </h1>
                        </div>
                        <div className='mt-4 text-center'>
                            {/* 감자 설명 또는 Group.svg 설명 표시 */}
                            <p className='mt-10 text-16 text-primary'>
                                {isOverlayed
                                    ? 'This is a special potato with no additional information.'
                                    : potatoInfo.description}
                                {/* isOverlayed가 true일 때 설명 텍스트 표시 */}
                                {/* isOverlayed가 false일 때 감자 설명 표시 */}
                            </p>
                        </div>
                        <div className='flex justify-center mt-6 space-x-4'>
                            {/* OK 버튼 */}
                            <button
                                onClick={onOk} // OK 버튼 클릭 시 onOk 함수 호출
                                className='px-10 py-5 ml-5 text-white duration-200 mt-50 h-33 w-100 rounded-4 bg-primary text-14 hover:scale-105'
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PotatoInfoModal;
