import React from 'react';

const Footer = () => {
    return (
        <div className='h-308 w-full px-10 pb-25 pt-35 shadow-custom-light tablet:mt-10'>
            <div className='mx-auto flex h-full w-[calc(100%-500px)] flex-col justify-between wide:w-1400'>
                <div className='flex'>
                    <div className='w-300'>
                        <p className='text-16 font-bold'>소셜</p>
                        <ul className='m-0 p-0'>
                            <li className='my-2 text-14 text-gray-98'>인스타</li>
                            <li className='my-2 text-14 text-gray-98'>인스타</li>
                            <li className='my-2 text-14 text-gray-98'>인스타</li>
                            <li className='my-2 text-14 text-gray-98'>인스타</li>
                            <li className='mt-2 text-14 text-gray-98'>인스타</li>
                        </ul>
                    </div>
                    <div className='w-300'>
                        <p className='text-16 font-bold'>고객센터</p>
                        <ul className='m-0 p-0'>
                            <li className='my-2 text-14 text-gray-98'>몰랑</li>
                            <li className='my-2 text-14 text-gray-98'>사업자 뭐시기</li>
                            <li className='my-2 text-14 text-gray-98'>전화번호</li>
                            <li className='my-2 text-14 text-gray-98'>굿~</li>
                            <li className='mt-2 text-14 text-gray-98'>짱</li>
                        </ul>
                    </div>
                </div>
                <p className='text-14 text-gray-98'>CopyrightⓒProject</p>
            </div>
        </div>
    );
};

export default Footer;
