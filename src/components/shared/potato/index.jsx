import React from 'react';

const Potato = ({ selectedImage }) => {
    return (
        <div className='h-full w-full overflow-hidden'>
            {selectedImage ? ( // 선택된 이미지가 있으면 이미지를 표시하고, 없으면 메시지를 표시합니다.
                <img src={`/collection/${selectedImage}`} alt='Selected Potato' />
            ) : (
                <p>No potato selected.</p>
            )}
        </div>
    );
};

export default Potato;
