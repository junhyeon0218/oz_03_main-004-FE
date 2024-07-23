import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StackTag from '../../../lib/stack/index';

const Stack = () => {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [stacks, setStacks] = useState([]);
    const [selectedStacks, setSelectedStacks] = useState([]);

    useEffect(() => {
        const fetchStacks = async () => {
            try {
                // API 호출위치
                // const response = await fetch(`/api/stacks/${id}`);
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data = await response.json();

                // 임시 데이터(나중에 삭제)
                const data = [
                    { id: 1, name: 'JavaScript', isSelected: true },
                    { id: 2, name: 'TypeScript', isSelected: false },
                    { id: 3, name: 'Python', isSelected: false },
                    { id: 4, name: 'Java', isSelected: false },
                    { id: 5, name: 'React', isSelected: true },
                    { id: 6, name: 'HTML / CSS', isSelected: false },
                    { id: 7, name: 'Node.js', isSelected: true },
                    { id: 8, name: 'Express', isSelected: false },
                    { id: 9, name: 'MongoDB', isSelected: true },
                    { id: 10, name: 'PostgreSQL', isSelected: false },
                    { id: 11, name: 'MySQL', isSelected: false },
                    { id: 12, name: 'GraphQL', isSelected: true },
                    { id: 13, name: 'Docker', isSelected: false },
                    { id: 14, name: 'Kubernetes', isSelected: false },
                    { id: 15, name: 'AWS', isSelected: true },
                    { id: 16, name: 'GCP', isSelected: false },
                    { id: 17, name: 'Azure', isSelected: false },
                    { id: 18, name: 'Git', isSelected: true },
                    { id: 19, name: 'GitHub', isSelected: false },
                    { id: 20, name: 'GitLab', isSelected: false },
                    { id: 21, name: 'Bitbucket', isSelected: true },
                    { id: 22, name: 'CI/CD', isSelected: false },
                    { id: 23, name: 'Jenkins', isSelected: false },
                    { id: 24, name: 'Webpack', isSelected: true },
                    { id: 25, name: 'Babel', isSelected: false },
                    { id: 26, name: 'ESLint', isSelected: false },
                    { id: 27, name: 'Prettier', isSelected: true },
                    { id: 28, name: 'Redux', isSelected: false },
                    { id: 29, name: 'MobX', isSelected: false },
                    { id: 30, name: 'Next.js', isSelected: true },
                ];

                setStacks(data);
                // 처음에는 모든 스택을 선택된 상태로 설정
                setSelectedStacks(data.filter((stack) => stack.isSelected));
            } catch (error) {
                console.error('Error fetching stacks:', error);
            }
        };

        fetchStacks();
    }, [id]);

    const handleEdit = () => {
        if (isEdit) {
            // save 모드로 전환: 선택된 스택만 남기기
            const newSelectedStacks = stacks.filter((stack) => stack.isSelected);
            setSelectedStacks(newSelectedStacks);
        }
        setIsEdit(!isEdit);
    };

    //선택된 stack 상태 변경 업데이트
    const toggleSelectStack = (stackId) => {
        // 현재 스택의 ID가 선택한 스택의 ID와 일치하면 선택상태 변경
        const updatedStacks = stacks.map((stack) =>
            stack.id === stackId ? { ...stack, isSelected: !stack.isSelected } : stack
        );
        setStacks(updatedStacks);
    };

    return (
        <div className='h-full w-full'>
            <div className='mb-30 flex h-30 justify-between'>
                <h1 className='text-20 font-bold leading-30'>Skills & Stacks</h1>
                <button
                    type='button'
                    onClick={handleEdit}
                    className='flex h-30 w-81 items-center justify-center rounded-16 bg-white px-14 py-6 shadow-custom-light'
                >
                    <img src='../../../../public/button/write.svg' alt='' />
                    <span className='ml-6 h-18 text-14 text-gray-98'>{isEdit ? 'save' : 'edit'}</span>
                </button>
            </div>
            <div className='flex max-h-[calc(100%-60px)] flex-wrap items-start justify-start gap-4 overflow-y-auto'>
                {isEdit ? (
                    stacks.map((stack) => (
                        <StackTag
                            key={stack.id}
                            name={stack.name}
                            isSelected={stack.isSelected}
                            isEdit={isEdit}
                            onClick={() => toggleSelectStack(stack.id)}
                        />
                    ))
                ) : selectedStacks.length > 0 ? (
                    selectedStacks.map((stack) => (
                        <StackTag key={stack.id} name={stack.name} isSelected={stack.isSelected} isEdit={isEdit} />
                    ))
                ) : (
                    <div className='h-full w-full text-center'>
                        <p className='mt-70 text-center text-14 text-gray-98'>No selected Skills & Stacks</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stack;
