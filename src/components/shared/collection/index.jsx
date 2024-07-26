import React, { useState } from 'react';
import axios from 'axios';
import ChangePotatoModal from '../../modal/ChangePotatoModal';

function Collection({ onSelectImage }) {
    const [isExpanded, setIsExpanded] = useState(false);
    //const [imageFiles, setImageFiles] = useState([]); 서버에서 사진을 받아올 경우(추후에 코드를 사용할 예정)
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleSize = () => {
        setIsExpanded(!isExpanded);
    };

    // 이미지를 클릭 시
    const handleImageClick = (image) => {
        setSelectedImage(image); // 선택된 이미지를 상태에 저장
        onSelectImage(image); // 선택된 이미지를 부모 컴포넌트로 전달
    };

    //임시 이미지 데이터(서버 연결 이후 삭제 예정)
    const imageFiles = [
        'potato.svg',
        'basicpotato.svg',
        'downarrow.svg',
        'basicpotato.svg',
        'potato.svg',
        'basicpotato.svg',
        'potato.svg',
        'potato.svg',
        'basicpotato.svg',
        'potato.svg',
        'basicpotato.svg',
        'potato.svg',
        'potato.svg',
        'basicpotato.svg',
    ];
    // 서버에서 사진을 받아올 경우(추후에 코드를 사용할 예정)
    // useEffect(() => {
    //     //서버에서 이미지 데이터를 받아오는 함수
    //     const fetchImageFiles = async () => {
    //         try {
    //             const response = await axios.get('/api/potato'); // 예시 URL, 실제 URL에 맞게 수정 필요
    //             setImageFiles(response.data.images); // 서버에서 받은 이미지 데이터를 상태에 설정
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //             // 에러 처리 로직 추가
    //         }
    //     };

    //     fetchImageFiles(); // 함수 호출

    // }, []);

    const getPotatoImages = (files) => {
        return files.map((fileName, i) => {
            const title = fileName.split('.').slice(0, -1).join('.'); // 확장자명을 제거한 파일 이름

            return (
                <div
                    key={i}
                    className='mx-auto mb-30 flex h-190 w-170 flex-col items-center justify-center rounded-4 border shadow-md'
                    onClick={() => handleImageClick(fileName)}
                >
                    <img src={`/collection/${fileName}`} alt={`Potato ${i + 1}`} className='h-118 w-85' />
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
            <div className='flex h-90 items-center'>
                <div className='w-100-h-30 mb-43 ml-20 mt-24 text-20 font-bold'>Collection</div>
                {!isExpanded && (
                    <div className='mb-46 ml-80 mt-30 h-21 w-132 text-14 text-gray-98'>Choose your Potato</div>
                )}
            </div>
            <button onClick={toggleSize} className='absolute right-2 top-2 rounded-4 bg-transparent p-2'>
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
                        <div className='col-span-7 flex h-full items-center justify-center'>
                            <p className='mt-70 text-center text-14 text-gray-98'>
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
