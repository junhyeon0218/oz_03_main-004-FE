import React from 'react';
import { useState, useEffect } from 'react';

//Error 메세지 내용 / 유효성 검사:정규표현식
const ERROR_MSG = {
    required: 'Please enter required information',
    emailPattern: 'Invalid email address',
    passwordPattern: 'Must be 8+ characters with letter, number, and special character (!, @, #)',
    matchPassword: 'The passwords do not match',
    nickname: 'Please enter at least 4 characters using only English letters',
    futureDate: 'Birth date cannot be in the future',
    invalidDate: 'Invalid date format (MM/DD/YYYY)',
};
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_REGEX = /^[A-Za-z0-9!@#]{8,}$/;
const NICKNAME_REGEX = /^[A-Za-z]{4,}$/;
const DATE_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;

const FormInput = ({
    id,
    label,
    type,
    placeholder,
    error,
    setError,
    onChange,
    value,
    isFormValid,
    setIsFormValid,
    password,
}) => {
    useEffect(() => {
        validateInput();
    }, [value]);

    //유효성검사
    //? switch 로 바꾸는게 깔끔할까?
    const validateInput = () => {
        let isValid = true;

        if (type === 'email') {
            if (!EMAIL_REGEX.test(value)) {
                setError(ERROR_MSG.emailPattern);
                isValid = false;
            } else {
                setError(''); // Clear error
            }
        } else if (id === 'userPassword') {
            if (!PASSWORD_REGEX.test(value)) {
                setError(ERROR_MSG.passwordPattern);
                isValid = false;
            } else {
                setError(''); // Clear error
            }
        } else if (id === 'chkPassword') {
            // console.log('++++');
            // console.log(password);
            // console.log(value);
            if (value !== password) {
                setError(ERROR_MSG.matchPassword);
                isValid = false;
            } else {
                setError('');
            }
        } else if (type === 'nickname') {
            if (!NICKNAME_REGEX.test(value)) {
                setError(ERROR_MSG.nickname);
            } else {
                setError('');
            }
        } else if (id === 'userBirth') {
            if (!DATE_REGEX.test(value)) {
                setError(ERROR_MSG.invalidDate);
                isValid = false;
            } else {
                const [month, day, year] = value.split('/').map(Number);
                const birthDate = new Date(year, month - 1, day);
                const today = new Date();
                if (birthDate > today) {
                    setError(ERROR_MSG.futureDate);
                    isValid = false;
                } else {
                    setError('');
                }
            }
        }

        setIsFormValid(isValid);
    };

    //생일
    const handleDateChange = (e) => {
        //input = 숫자아닌 문자제거
        let input = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (input.length >= 4) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        } else if (input.length >= 2) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        onChange({ ...e, target: { ...e.target, value: input } });
    };

    //error가 있으면 input border 색상 red로 변경
    const inputStatus = error ? 'border-red' : 'border-gray-db';

    return (
        <div className='my-8 inline-flex h-auto w-520 flex-col items-start justify-start gap-2'>
            <label htmlFor={id} className='mb-3 text-16 text-black'>
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                required
                autoComplete='off'
                className={`inline-flex h-50 w-520 items-center justify-start gap-2.5 rounded-4 border ${inputStatus} bg-white px-16 px-4 py-15 focus:border-strong`}
                onChange={(e) => {
                    if (id === 'userBirth') {
                        handleDateChange(e);
                    } else {
                        onChange(e);
                    }
                    validateInput();
                }}
                value={value}
            />
            {error && <p className='mb-5 text-14 text-red'>{error}</p>}
        </div>
    );
};

export default FormInput;
