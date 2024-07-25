import React, { useState, useEffect } from 'react';
import useDate from '../../../store/store';
import checkBtn from '/button/checkBtn.svg';
import deleteBtn from '/button/deleteBtn.svg';
import axiosInstance, { fetchTodosForDate } from '../../../api/axios';

// TodoInput 컴포넌트: 새로운 todo 항목을 입력하고 추가하거나 취소할 수 있는 입력 폼
const TodoInput = ({ onAdd, onCancel }) => {
    const [inputValue, setInputValue] = useState('');

    // 입력된 값을 추가하는 함수
    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className='z-30 mx-auto my-10 flex min-h-50 w-[98%] items-center justify-between px-20 shadow-custom-light'>
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className=''
                placeholder='Enter todo'
            />
            <div className='flex'>
                <img src={checkBtn} onClick={handleAdd} className='aspect-square' alt='' />

                <img src={deleteBtn} onClick={onCancel} className='aspect-square' alt='' />
            </div>
        </div>
    );
};

// TodoItem 컴포넌트: 각 todo 항목을 표시하고 수정, 완료, 삭제할 수 있는 컴포넌트
const TodoItem = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text);

    // 수정된 값을 업데이트하는 함수
    const handleUpdate = () => {
        onUpdate(todo.id, editValue);
        setIsEditing(false);
    };

    return (
        <div className='z-20 mx-auto my-10 flex min-h-50 w-[98%] items-center justify-between px-20 shadow-custom-light'>
            {isEditing ? (
                <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            ) : (
                <span
                    onClick={() => onToggleComplete(todo.id)}
                    className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
                >
                    {todo.text}
                </span>
            )}
            <div className='flex'>
                {isEditing ? (
                    <img src={checkBtn} alt='' onClick={handleUpdate} className='w-20 h-20' />
                ) : (
                    <img src='../../../../public/button/write.svg' onClick={() => setIsEditing(true)} alt='' />
                )}

                <img src={deleteBtn} onClick={() => onDelete(todo.id)} className='aspect-square' alt='' />
            </div>
        </div>
    );
};

// Todo 컴포넌트: 전체 Todo 리스트를 관리하고, TodoInput과 TodoItem 컴포넌트를 포함하는 메인 컴포넌트
const Todo = () => {
    const [user, setUser] = useState(true); // 로그인 여부
    const [todos, setTodos] = useState([]); // todo 항목 저장
    const [isAdding, setIsAdding] = useState(false); // 새로운 todo 항목을 추가 중인지 여부
    const selectedDate = useDate((state) => state.selectedDate); // 선택된 날짜 가져오기

    // 서버 연동시 주석 풀기
    // const loadTodos = async () => {
    //     try {
    //         const data = await fetchTodosForDate(selectedDate);
    //         setTodos(data);
    //     } catch (error) {
    //         console.error('Failed to load todos:', error);
    //     }
    // };
    // // 선택된 날짜 투두 가져오기
    // useEffect(() => {
    //     loadTodos();
    // }, [selectedDate]);

    // 새로운 todo 항목 추가
    // const handleAddTodo = async (text) => {
    //     try {
    //         const response = await axiosInstance.post('/todos', {
    //             id: Date.now(),
    //             date: selectedDate,
    //             text,
    //             completed: false,
    //         });
    //         setTodos((prevTodos) => [...prevTodos, response.data]);
    //         setIsAdding(false);
    //         loadTodos();
    //     } catch (error) {
    //         console.error('Failed to add todo:', error);
    //     }
    // };

    // // 기존 todo 항목 업데이트
    // const handleUpdateTodo = async (id, newText) => {
    //     try {
    //         const response = await axiosInstance.put(`/todos/${id}`, {
    //             text: newText,
    //         });
    //         setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? response.data : todo)));
    //         loadTodos();
    //     } catch (error) {
    //         console.error('Failed to update todo:', error);
    //     }
    // };

    // // todo 항목 삭제
    // const handleDeleteTodo = async (id) => {
    //     try {
    //         await axiosInstance.delete(`/todos/${id}`);
    //         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    //         loadTodos();
    //     } catch (error) {
    //         console.error('Failed to delete todo:', error);
    //     }
    // };

    // // todo 항목의 완료 상태를 토글하는 함수
    // const handleToggleComplete = async (id) => {
    //     try {
    //         const todoToUpdate = todos.find((todo) => todo.id === id);
    //         const response = await axiosInstance.put(`/todos/${id}`, {
    //             completed: !todoToUpdate.completed,
    //         });
    //         setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? response.data : todo)));
    //         loadTodos();
    //     } catch (error) {
    //         console.error('Failed to toggle todo completion:', error);
    //     }
    // };

    // useEffect(() => {
    //     console.log(todos);
    // }, [todos]);

    // 개발 단계용
    // 새로운 todo 항목 추가
    const handleAddTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            date: selectedDate,
            text,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setIsAdding(false);
    };

    // 기존 todo 항목 업데이트
    const handleUpdateTodo = (id, newText) => {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    // todo 항목 삭제
    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // todo 항목의 완료 상태를 토글하는 함수
    const handleToggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        );
    };

    // 선택된 날짜에 해당하는 투두 항목 필터링
    const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-20 leading-30'>Todo</h1>
                <p>{selectedDate}</p>
                {user ? (
                    <button
                        onClick={() => setIsAdding(true)}
                        className='flex items-center justify-center rounded-full h-30 w-80 shadow-custom-light'
                    >
                        <img src='/button/write.svg' alt='' />
                        <span className='ml-2 text-14 text-gray-98'>write</span>
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
            <div className='relative flex flex-col h-full mt-20 overflow-y-auto grow scrollbar-hide'>
                {isAdding && <TodoInput onAdd={handleAddTodo} onCancel={() => setIsAdding(false)} />}

                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdateTodo}
                            onDelete={handleDeleteTodo}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))
                ) : (
                    <div className='absolute inset-0 z-10 flex items-center justify-center h-full text-center text-gray-98'>
                        <p>Add Todo</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Todo;
