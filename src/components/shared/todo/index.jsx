import React, { useState, useEffect } from 'react';
import useDate from '../../../store/dateStore';
import Alert from '../../common/alert';
import { todoAPI } from '../../../apis/api/todo';
import { todoService } from '../../../apis/services/todoService';
import useCalendarStore from '../../../store/todosCompleteStore';

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
                className='w-full'
                placeholder='Enter todo'
                maxLength={50}
            />
            <div className='flex'>
                <img src='/images/checkBtn.png' onClick={handleAdd} className='aspect-square' alt='' />

                <img src='/images/deleteBtn.png' onClick={onCancel} className='aspect-square' alt='' />
            </div>
        </div>
    );
};

// TodoItem 컴포넌트: 각 todo 항목을 표시하고 수정, 완료, 삭제할 수 있는 컴포넌트
const TodoItem = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text || '');

    // 수정된 값을 업데이트하는 함수
    const handleUpdate = () => {
        onUpdate(todo.id, editValue);
        setIsEditing(false);
    };

    return (
        <div
            className={`z-20 mx-auto my-10 flex min-h-50 w-[98%] items-center justify-between px-20 shadow-custom-light ${todo.is_done ? 'bg-gray-50' : ''}`}
        >
            {isEditing ? (
                <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            ) : (
                <span
                    onClick={() => onToggleComplete(todo.id, todo.is_done)}
                    className={`flex-1 ${todo.is_done ? 'line-through' : ''}`}
                >
                    {todo.task}
                </span>
            )}
            <div className='flex'>
                {isEditing ? (
                    <img src='/images/checkBtn.png' alt='' onClick={handleUpdate} className='h-20 w-20' />
                ) : (
                    <img src='/images/write.png' onClick={() => setIsEditing(true)} alt='' />
                )}

                <img src='/images/deleteBtn.png' onClick={() => onDelete(todo.id)} className='aspect-square' alt='' />
            </div>
        </div>
    );
};

// Todo 컴포넌트: 전체 Todo 리스트를 관리하고, TodoInput과 TodoItem 컴포넌트를 포함하는 메인 컴포넌트
const Todo = () => {
    const [todos, setTodos] = useState([]); // todo 항목 저장
    const [isAdding, setIsAdding] = useState(false); // 새로운 todo 항목을 추가 중인지 여부
    const selectedDate = useDate((state) => state.selectedDate); // 선택된 날짜 가져오기
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const { fetchCalendarData } = useCalendarStore();

    // Alert 표시 함수
    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
    };

    // Alert 숨기기 함수
    const hideAlert = () => {
        setAlert({ show: false, message: '', type: 'success' });
    };

    // 선택된 날짜의 투두 항목을 가져오는 함수
    const fetchTodos = async () => {
        try {
            const selectedDateTodos = await todoAPI.getTodosByDate(selectedDate);
            setTodos(selectedDateTodos);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [selectedDate]);

    // 새로운 todo 항목 추가
    const handleAddTodo = async (text) => {
        try {
            const updatedTodos = await todoService.addTodo(text, selectedDate);
            setTodos(updatedTodos);
            setIsAdding(false);
            showAlert('Todo added successfully!');
        } catch (error) {
            console.error(error);
            showAlert('Failed to add todo', 'error');
        }
    };

    // 기존 todo 항목 업데이트
    const handleUpdateTodo = async (id, newText) => {
        try {
            const updatedTodos = await todoService.updateTodo(id, newText, selectedDate);
            setTodos(updatedTodos);
            showAlert('Todo updated successfully!');
        } catch (error) {
            console.error(error);
            showAlert('Failed to update todo', 'error');
        }
    };

    // todo 항목 삭제
    const handleDeleteTodo = async (id) => {
        try {
            const updatedTodos = await todoService.deleteTodo(id, selectedDate);
            setTodos(updatedTodos);
            showAlert('Todo deleted successfully!');
        } catch (error) {
            console.error(error);
            showAlert('Failed to delete todo', 'error');
        }
    };

    // todo 항목의 완료 상태를 토글하는 함수
    const handleToggleComplete = async (id, is_done) => {
        try {
            const updatedTodos = await todoService.toggleTodoComplete(id, is_done, selectedDate);
            setTodos(updatedTodos);
            showAlert('Todo status updated!');
            fetchCalendarData(selectedDate.slice(0, 4), selectedDate.slice(5, 7));
        } catch (error) {
            console.error(error);
            showAlert('Failed to update todo status', 'error');
        }
    };

    // 선택된 날짜에 해당하는 투두 항목 필터링
    // const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

    return (
        <>
            <div className='flex h-full flex-col'>
                <div className='flex justify-between'>
                    <h1 className='text-20 font-bold leading-30'>Todo</h1>
                    <p>{selectedDate}</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className='flex h-30 w-80 items-center justify-center rounded-full shadow-custom-light'
                    >
                        <img src='/images/write.png' alt='' />
                        <span className='ml-2 text-14 text-gray-98'>write</span>
                    </button>
                </div>
                <div className='relative mt-20 flex h-full grow flex-col overflow-y-auto scrollbar-hide'>
                    {isAdding && <TodoInput onAdd={handleAddTodo} onCancel={() => setIsAdding(false)} />}

                    {todos && todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                                onToggleComplete={handleToggleComplete}
                            />
                        ))
                    ) : (
                        <div className='absolute inset-0 z-10 flex h-full items-center justify-center text-center text-gray-98'>
                            <p>Add Todo</p>
                        </div>
                    )}
                </div>
            </div>
            {alert.show && <Alert text={alert.message} type={alert.type} onClose={hideAlert} />}
        </>
    );
};

export default Todo;
