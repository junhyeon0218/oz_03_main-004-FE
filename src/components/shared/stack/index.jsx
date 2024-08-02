import React, { useState, useEffect, useRef } from 'react';
import { stackAPI } from '../../../apis/api/stack';
import { stackService } from '../../../apis/services/stackService';

const Stack = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [stacks, setStacks] = useState([]);
    const [selectedStacks, setSelectedStacks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [filteredStacks, setFilteredStacks] = useState([]);
    const previousColorRef = useRef(null);

    const colors = [
        'bg-[#AD5A10]',
        'bg-[#228B22]',
        'bg-[#CE9D00]',
        'bg-[#FFD700]',
        'bg-[#10A95C]',
        'bg-[#3366FE]',
        'bg-[#5B8FFF]',
        'bg-[#FF9110]',
        'bg-[#FFAB38]',
        'bg-[#F54025]',
        'bg-[#FE7E6B]',
    ];
    const getRandomColor = () => {
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while (newColor === previousColorRef.current) {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        previousColorRef.current = newColor;
        return newColor;
    };

    useEffect(() => {
        const fetchStacks = async () => {
            try {
                const allStacks = await stackService.getAllStacks();
                const userStacks = await stackService.getUserStacks();

                // 사용자 스택에 있는 항목들의 ID를 수집
                const userStackIds = userStacks.map((stack) => stack.stackId);

                // 전체 스택에서 사용자 스택에 있는 항목의 isSelected 상태를 true로 설정
                const updatedStacks = allStacks.map((stack) => ({
                    ...stack,
                    isSelected: userStackIds.includes(stack.id),
                    color: getRandomColor(),
                }));

                setStacks(updatedStacks);
                setSelectedStacks(updatedStacks.filter((stack) => stack.isSelected));
            } catch (error) {
                console.error('Error fetching stacks:', error);
            }
        };
        fetchStacks();
    }, []);

    useEffect(() => {
        setFilteredStacks(
            stacks.filter((stack) => stack.name && stack.name.toLowerCase().includes(searchKey.toLowerCase()))
        );
    }, [searchKey, stacks]);

    const handleEdit = () => {
        if (isEdit) {
            const newSelectedStacks = stacks.filter((stack) => stack.isSelected);
            setSelectedStacks(newSelectedStacks);
        }
        setIsEdit(!isEdit);
    };

    const handleStackClick = async (id) => {
        if (isEdit) {
            try {
                const updatedStacks = stacks.map((stack) => {
                    if (stack.id === id) {
                        const isSelected = !stack.isSelected;
                        return { ...stack, isSelected };
                    }
                    return stack;
                });

                setStacks(updatedStacks);

                // 클릭된 스택 정보 가져오기
                const clickedStack = updatedStacks.find((stack) => stack.id === id);

                // 사용자 스택 정보 가져오기
                const userStacks = await stackService.getUserStacks();

                // 사용자가 선택한 스택의 stackId와 클릭된 스택의 id가 같은 경우
                const matchingUserStack = userStacks.find((userStack) => userStack.stackId === clickedStack.id);

                if (clickedStack.isSelected) {
                    // 스택을 생성할 때 stackId를 사용
                    await stackAPI.createUserStack(clickedStack.id);
                } else {
                    // matchingUserStack가 undefined인지 확인 후 처리
                    if (matchingUserStack) {
                        // 스택을 삭제할 때 id를 사용
                        await stackAPI.deleteUserStack(matchingUserStack.id);
                    } else {
                        console.error(`No matching user stack found for stack id: ${clickedStack.id}`);
                    }
                }
            } catch (error) {
                console.error('Error updating stack:', error);
                // 에러 발생 시 상태를 원래대로 되돌립니다.
                setStacks(stacks);
            }
        }
    };

    const handleChooseClick = () => {
        setIsEdit(true);
    };

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    };

    const handleEditWithReset = () => {
        handleEdit();
        if (isEdit) {
            setSearchKey('');
        }
    };

    const StackTag = ({ name, isSelected, color, isEdit, onClick }) => {
        return (
            <span
                className={`mb-2 cursor-pointer rounded-8 px-10 py-3 text-16 text-white ${
                    isSelected ? color : 'bg-gray-db'
                }`}
                onClick={isEdit ? onClick : null}
            >
                {name}
            </span>
        );
    };

    return (
        <div className='h-full w-full'>
            {selectedStacks.length > 0 || isEdit ? (
                <>
                    <div className='flex h-30 justify-between'>
                        <h1 className='text-20 font-bold leading-30 1440:text-18'>Skills & Stacks</h1>
                        <button
                            type='button'
                            onClick={handleEditWithReset}
                            className='flex h-30 w-81 items-center justify-center rounded-16 bg-white px-14 py-6 shadow-custom-light'
                        >
                            <img src='/images/write.png' alt='' />
                            <span className='ml-6 h-18 whitespace-nowrap text-14 text-gray-98'>
                                {isEdit ? 'save' : 'edit'}
                            </span>
                        </button>
                    </div>
                    {isEdit && (
                        <div className='mb-10 mt-15 flex h-32 w-full animate-slide-down items-center justify-between rounded-8 bg-gray-fa px-12 shadow-custom-light'>
                            <input
                                type='text'
                                placeholder='Search and find Skill & Stack'
                                className='mr-4 flex-grow bg-gray-fa text-14 text-black placeholder:text-gray-98'
                                value={searchKey}
                                onChange={handleSearchChange}
                            />
                            <img src='/images/search.png' className='h-25 w-25 cursor-pointer' />
                        </div>
                    )}
                    <div
                        className={`scrollbar-hide ${!isEdit ? 'mt-20 max-h-[calc(100%-45px)]' : 'mt-15 max-h-[calc(100%-90px)]'} flex flex-wrap gap-4 overflow-y-auto`}
                    >
                        {(isEdit ? filteredStacks : selectedStacks).map((stack) => (
                            <StackTag
                                key={stack.id}
                                name={stack.name}
                                isSelected={stack.isSelected}
                                color={stack.color}
                                isEdit={isEdit}
                                onClick={() => handleStackClick(stack.id)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className='flex h-full w-full flex-col items-center justify-center text-center'>
                    <h1 className='text-20 font-bold leading-30'>Choose your Skills & Stack</h1>
                    <button
                        className='mt-7 h-44 rounded-4 bg-primary p-10 text-16 font-bold text-white duration-200 hover:scale-105'
                        onClick={handleChooseClick}
                    >
                        Choose
                    </button>
                </div>
            )}
        </div>
    );
};

export default Stack;
