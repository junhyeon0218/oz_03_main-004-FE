import Loading from '../../common/loading';
import Alert from '../../common/alert';
import React, { useEffect, useState } from 'react';

const Potato = ({ selectedImage }) => {
    const [coinCount, setCoinCount] = useState(0);

    useEffect(() => {
        // 서버에서 코인 개수를 받아오는 함수
        const fetchCoins = async () => {
            try {
                const response = await fetch('https://my-api-endpoint.com/coins'); // API 엔드포인트로 변경예정
                const data = await response.json();
                setCoinCount(data.coins);
            } catch (error) {
                console.error('Error fetching coin count:', error);
            }
        };

        fetchCoins();
    }, []);

    return (
        <div className='flex flex-col items-center w-auto h-auto'>
            <div className='flex justify-center w-full'>
                <img src='/src/assets/images/coin.svg' className='mr-5 mb-30 h-25 w-55 text-14' alt='Coin' /> :{' '}
                {coinCount}
            </div>
            {selectedImage ? (
                <img src={selectedImage} alt='Selected Potato' className='scale-150 h-100 w-120' />
            ) : (
                <p>No potato selected.</p>
            )}
        </div>
    );
};

export default Potato;
