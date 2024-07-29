import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Collection({ onSelectImage }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [ownedPotatoes, setOwnedPotatoes] = useState([]);

    // 사이즈 토글 함수
    const toggleSize = () => {
        setIsExpanded(!isExpanded);
    };

    // 소유한 감자 데이터를 가져오는 비동기 함수
    const fetchOwnedPotatoes = async () => {
        try {
            const response = await axios.get('/api/owned-potatoes');
            setOwnedPotatoes(response.data);
        } catch (error) {
            console.error('Error fetching owned potatoes:', error);
        }
    };

    useEffect(() => {
        fetchOwnedPotatoes();
    }, []);

    // 이미지 클릭 핸들러
    const handleImageClick = (imagePath, isOwned) => {
        setSelectedImage(imagePath);
        // `isOwned` 상태에 따라 오버레이 상태를 결정
        onSelectImage(imagePath, !isOwned); // !isOwned를 통해 오버레이 상태 전달
    };

    // 이미지 파일을 가져오는 함수
    const images = import.meta.glob('/src/assets/images/*Potato.{png,jpg,jpeg,svg}');
    const imageFiles = Object.keys(images)
        .map((key) => key.replace('/src/assets/images/', ''))
        .filter((fileName) => fileName !== 'Group.svg');

    // 감자 이미지 순서 설정
    const order = [
        'levelOnePotato.svg',
        'levelTwoPotato.svg',
        'levelThreePotato.svg',
        'levelFourPotato.svg',
        'levelFivePotato.svg',
    ];

    // 이미지 파일 정렬
    imageFiles.sort((a, b) => {
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    const getPotatoImages = (files) => {
        return files.map((fileName, i) => {
            const imagePath = `/src/assets/images/${fileName}`;
            const title = fileName.split('.').slice(0, -1).join('.');
            const isOwned = ownedPotatoes.includes(title);

            return (
                <div
                    key={i}
                    className={`relative mx-auto mb-20 flex h-190 w-170 flex-col items-center justify-center rounded-4 border shadow-custom-light`}
                    onClick={() => handleImageClick(imagePath, isOwned)}
                >
                    <img src={imagePath} alt={`Potato ${i + 1}`} className='h-118 w-85' />
                    {!isOwned && (
                        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#d9d9d9] bg-opacity-50 backdrop-blur-sm'>
                            <img src='/src/assets/images/Group.svg' alt='Overlay' className='h-100 w-100' />
                        </div>
                    )}
                    <p className='mt-2'>{title}</p>
                </div>
            );
        });
    };

    const containerHeight = isExpanded ? 'max-h-full h-auto pb-20' : 'h-82';

    return (
        <div
            className={`relative flex w-full flex-col rounded-4 bg-white p-4 shadow-custom-dark transition-all ${containerHeight}`}
        >
            <div className='flex items-center h-90'>
                <div className='mt-24 ml-20 font-bold w-100-h-30 mb-43 text-20'>Collection</div>
                {!isExpanded && (
                    <div className='mb-46 ml-80 mt-30 h-21 w-132 text-14 text-gray-98'>Choose your Potato</div>
                )}
            </div>
            <button onClick={toggleSize} className='absolute p-2 bg-transparent right-2 top-2 rounded-4'>
                {isExpanded ? (
                    <img src='/collection/uparrow.svg' alt='Collapse' className='mr-33 mt-27 h-19 w-19' />
                ) : (
                    <img src='/collection/downarrow.svg' alt='Expand' className='mr-33 mt-27 h-19 w-19' />
                )}
            </button>
            <div className='overflow-y-scroll scrollbar-hide'>
                <div className={`mx-auto grid h-auto gap-4 ${isExpanded ? 'grid-cols-7' : 'hidden'}`}>
                    {imageFiles.length > 0 ? (
                        getPotatoImages(imageFiles)
                    ) : (
                        <div className='flex items-center justify-center h-full col-span-7'>
                            <p className='text-center mt-70 text-14 text-gray-98'>
                                There are no potatoes to choose from!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Collection;
