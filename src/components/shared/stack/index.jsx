import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Stack = () => {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [stacks, setStacks] = useState([]);
    const [selectedStacks, setSelectedStacks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [filteredStacks, setFilteredStacks] = useState([]);

    const colors = [
        'bg-[#AD5A10]',
        'bg-[#F2C32D]',
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

    useEffect(() => {
        const fetchStacks = async () => {
            try {
                // 임시 데이터
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
                ].map((stack) => ({
                    ...stack,
                    color: colors[Math.floor(Math.random() * colors.length)],
                }));

                setStacks(data);
                setSelectedStacks(data.filter((stack) => stack.isSelected));
            } catch (error) {
                console.error('Error fetching stacks:', error);
            }
        };

        fetchStacks();
    }, [id]);

    useEffect(() => {
        setFilteredStacks(stacks.filter((stack) => stack.name.toLowerCase().includes(searchKey.toLowerCase())));
    }, [searchKey, stacks]);

    const handleEdit = () => {
        if (isEdit) {
            const newSelectedStacks = stacks.filter((stack) => stack.isSelected);
            setSelectedStacks(newSelectedStacks);
        }
        setIsEdit(!isEdit);
    };

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
        <div className='w-full h-full'>
            {selectedStacks.length > 0 || isEdit ? (
                <>
                    <div className='flex justify-between h-30'>
                        <h1 className='font-bold text-20 leading-30 1440:text-18'>Skills & Stacks</h1>
                        <button
                            type='button'
                            onClick={handleEditWithReset}
                            className='flex items-center justify-center py-6 bg-white h-30 w-81 rounded-16 px-14 shadow-custom-light'
                        >
                            <img src='/images/write.png' alt='' />
                            <span className='ml-6 h-18 whitespace-nowrap text-14 text-gray-98'>
                                {isEdit ? 'save' : 'edit'}
                            </span>
                        </button>
                    </div>
                    {isEdit && (
                        <div className='flex items-center justify-between w-full h-32 px-12 mb-10 mt-15 animate-slide-down rounded-8 bg-gray-fa shadow-custom-light'>
                            <input
                                type='text'
                                placeholder='Search and find Skill & Stack'
                                className='flex-grow mr-4 text-black bg-gray-fa text-14 placeholder:text-gray-98'
                                value={searchKey}
                                onChange={handleSearchChange}
                            />
                            <img src='/images/search.png' className='cursor-pointer h-25 w-25' />
                        </div>
                    )}
                    <div
                        className={`scrollbar-hide ${!isEdit ? 'mt-20 max-h-[calc(100%-45px)]' : 'mt-15 max-h-[calc(100%-90px)]'} flex flex-wrap gap-4 overflow-y-auto`}
                    >
                        {(isEdit ? filteredStacks : filteredStacks.filter((stack) => stack.isSelected)).map((stack) => (
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
                <div className='flex flex-col items-center justify-center w-full h-full text-center'>
                    <h1 className='font-bold text-20 leading-30'>Choose your Skills & Stack</h1>
                    <button
                        className='p-10 font-bold text-white duration-200 mt-7 h-44 rounded-4 bg-primary text-16 hover:scale-105'
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
