import React, { useState, useEffect } from 'react';

const Stack = ({ stacks, isEdit, handleEdit, handleStackClick }) => {
    const [searchKey, setSearchKey] = useState('');
    const [filteredStacks, setFilteredStacks] = useState(stacks);

    useEffect(() => {
        setFilteredStacks(stacks.filter((stack) => stack.name.toLowerCase().includes(searchKey.toLowerCase())));
    }, [searchKey, stacks]);

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    };

    const handleEditWithReset = () => {
        handleEdit();
        if (isEdit) {
            setSearchKey('');
        }
    };

    const StackTag = ({ name, isSelected, isEdit, onClick }) => {
        return (
            <span
                className={`mb-2 cursor-pointer rounded-8 px-10 py-3 text-16 text-white ${
                    isEdit ? (isSelected ? 'bg-blue' : 'bg-gray-db') : 'bg-blue'
                }`}
                onClick={isEdit ? onClick : null}
            >
                {name}
            </span>
        );
    };

    return (
        <>
            <div className='h-full w-full'>
                <div className='flex h-30 justify-between'>
                    <h1 className='text-20 font-bold leading-30'>Skills & Stacks</h1>
                    <button
                        type='button'
                        onClick={handleEditWithReset}
                        className='flex h-30 w-81 items-center justify-center rounded-16 bg-white px-14 py-6 shadow-custom-light'
                    >
                        <img src='../../../../public/button/write.svg' alt='' />
                        <span className='ml-6 h-18 whitespace-nowrap text-14 text-gray-98'>
                            {isEdit ? 'save' : 'edit'}
                        </span>
                    </button>
                </div>
                {isEdit && (
                    <div className='mb-20 mt-10 flex h-32 w-full items-center justify-between rounded-8 bg-gray-fa px-12 shadow-custom-dark'>
                        <input
                            type='text'
                            placeholder='Search and find Skill & stack'
                            className='mr-4 flex-grow bg-gray-fa text-14 text-black placeholder:text-gray-98'
                            value={searchKey}
                            onChange={handleSearchChange}
                        />
                        <img src='../../../public/button/search.svg' className='h-25 w-25 cursor-pointer' />
                    </div>
                )}
                <div
                    className={`scrollbar-hide ${!isEdit ? 'mt-30 max-h-[calc(100%-60px)]' : 'mt-0 max-h-[calc(100%-80px)]'} flex flex-wrap gap-4 overflow-y-auto`}
                >
                    {filteredStacks.map((stack) => (
                        <StackTag
                            key={stack.id}
                            name={stack.name}
                            isSelected={stack.isSelected}
                            isEdit={isEdit}
                            onClick={() => handleStackClick(stack.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Stack;
