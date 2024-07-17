import React, { useState } from 'react';
import axios from 'axios';

function Collection() {
    const [isExpanded, setIsExpanded] = useState(false);
    //const [imageFiles, setImageFiles] = useState([]); 서버에서 사진을 받아올 경우(추후에 코드를 사용할 예정)

    const toggleSize = () => {
        setIsExpanded(!isExpanded);
    };
    //임시 이미지 데이터(서버 연결 이후 삭제 예정)
    const imageFiles = [
        'potato.svg',
        'basicpotato.svg',
        'potato.svg',
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
        'potato.svg',
        'basicpotato.svg',
        'potato.svg',
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
                    className='flex flex-col items-center justify-center mx-auto border shadow-md mb-30 h-190 w-170 rounded-4'
                >
                    <img src={`/collection/${fileName}`} alt={`Potato ${i + 1}`} className='h-118 w-85' />
                    <p className='mt-2'>{title}</p>
                </div>
            );
        });
    };

    const containerHeight = isExpanded
        ? imageFiles.length > 7
            ? 'h-auto min-h-550' // 이미지가 7개를 넘으면 최소 높이를 550px로 설정
            : 'h-322'
        : 'h-82';

    return (
        <div className='flex items-start justify-center min-h-screen bg-gray-100'>
            <div
                className={`relative w-1395 rounded-4 border bg-white p-4 shadow-md transition-all ${containerHeight}`}
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
                <div className={`mx-auto grid gap-4 ${isExpanded ? 'grid-cols-7' : 'hidden'}`}>
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
