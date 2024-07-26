import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../common/loading';

// CircularProgressBar 컴포넌트 정의
const CircularProgressBar = ({ level, currentXP, maxXP }) => {
    const [radius, setRadius] = useState(90); // 원형 반지름 설정
    const [stroke, setStroke] = useState(12); // 선 굵기 설정

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2260) {
                setRadius(150);
                setStroke(18);
            } else if (window.innerWidth >= 1920) {
                setRadius(120);
                setStroke(16);
            } else if (window.innerWidth >= 1199) {
                setRadius(90);
                setStroke(12);
            } else {
                setRadius(120);
                setStroke(16);
            }
        };

        // 초기 설정
        handleResize();

        // 리사이즈 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const normalizedRadius = radius - stroke * 2; // 선 두께를 뺀 반지름 계산
    const circumference = normalizedRadius * 2 * Math.PI; // 원의 둘레 계산
    const progress = currentXP / maxXP; // 현재 경험치 비율 계산
    const strokeDashoffset = circumference - progress * circumference; // 선의 시작점 설정

    return (
        <div
            className='relative flex h-auto items-center justify-center'
            style={{ width: radius * 2, height: radius * 2 }}
        >
            <svg
                height={radius * 2}
                width={radius * 2}
                className='-rotate-90 transform' // 원을 회전하여 12시 방향이 시작점이 되게 함
            >
                <circle //배경 원
                    className='text-gray-bg drop-shadow' //배경 원 색상
                    stroke='currentColor' //현재 색상 이용해서 원 테두리 그리기
                    fill='transparent' //내부 투명하게
                    strokeWidth={stroke} //원 테두리 두께
                    r={normalizedRadius} //원 반지름 normalizedRadius = 두깨 제외
                    cx={radius}
                    cy={radius} //원 중심좌표
                />
                <circle //프로그레스 바
                    stroke='#91E491'
                    fill='transparent'
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`} // 선의 길이 설정(원 한바퀴)
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }} // 선의 오프셋 설정
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                <div className='whitespace-nowrap text-24 font-bold'>Lv. {level}</div>
                <div className='mt-2 text-12 text-gray-65'>
                    {currentXP} / {maxXP}
                </div>
            </div>
        </div>
    );
};

// App 컴포넌트 정의
const Level = () => {
    // 수치는 임시 설정, 추후 백엔드에서 정보 받아올 예정
    const level = 10; // 현재 레벨 설정
    const currentXP = 400; // 현재 경험치 설정
    const maxXP = 500; // 최대 경험치 설정

    return (
        <div className='Level h-auto justify-center'>
            <CircularProgressBar level={level} currentXP={currentXP} maxXP={maxXP} />
        </div>
    );
};

// const Level = () => {
//     const [levelData, setLevelData] = useState({
//         level: 0,
//         currentXP: 0,
//         maxXP: 100, // 기본값 설정
//     });

//     useEffect(() => {
//         // 데이터를 받아오는 함수 정의
//         const fetchLevelData = async () => {
//             try {
//                 const response = await axios.get('/api/level'); // 실제 API 엔드포인트로 변경 필요
//                 const data = response.data;
//                 setLevelData({
//                     level: data.level,
//                     currentXP: data.currentXP,
//                     maxXP: data.maxXP,
//                 });
//             } catch (error) {
//                 console.error('데이터를 가져오는 동안 오류가 발생했습니다:', error);
//             }
//         };

//         fetchLevelData();
//     }, []); // 컴포넌트가 마운트될 때 한 번만 실행

//     return (
//         <div className='Level'>
//             <CircularProgressBar
//                 level={levelData.level}
//                 currentXP={levelData.currentXP}
//                 maxXP={levelData.maxXP}
//             />
//         </div>
//     );
// };

export default Level;
