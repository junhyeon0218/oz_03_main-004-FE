import React from 'react';

const StackTag = ({ name, isSelected, isEdit, onClick }) => {
    return (
        <span
            className={`mb-2 rounded-8 px-10 py-3 text-16 text-white ${isEdit ? (isSelected ? 'bg-blue' : 'bg-gray-db') : 'bg-blue'}`}
            onClick={isEdit ? onClick : null}
        >
            {name}
        </span>
    );
};

export default StackTag;
