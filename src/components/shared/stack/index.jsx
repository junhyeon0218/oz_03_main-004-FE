import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StackList from '../../../lib/stack';

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
            // save 버튼 클릭시: 선택된 스택만 남기기
            const newSelectedStacks = stacks.filter((stack) => stack.isSelected);
            setSelectedStacks(newSelectedStacks);
        }
        setIsEdit(!isEdit);
    };

    // Edit상태일때 Stack 선택유무에 따라 Stack 업데이트
    const handleStackClick = (id) => {
        if (isEdit) {
            setStacks((prevStacks) =>
                prevStacks.map((stack) => (stack.id === id ? { ...stack, isSelected: !stack.isSelected } : stack))
            );
        }
    };

    const handleChooseClick = () => {
        setIsEdit(true);
    };

    return (
        <div className='h-full w-full'>
            {selectedStacks.length > 0 || isEdit ? (
                <StackList
                    stacks={isEdit ? stacks : selectedStacks}
                    isEdit={isEdit}
                    handleEdit={handleEdit}
                    handleStackClick={handleStackClick}
                />
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
