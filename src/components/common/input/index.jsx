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
    loginPassword: 'Please enter your Password',
};
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_REGEX = /^[A-Za-z0-9!@#]{8,}$/;
const NICKNAME_REGEX = /^[A-Za-z]+[A-Za-z0-9]{3,}$/;
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
    chkPassword,
    className, // input 가로길이 수정가능하게
}) => {
    //input type 관리
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        //초기값이 없을때는 유효성검사를 건너뛰기
        if (value !== placeholder && value !== '') {
            validateInput();
        }
    }, [value, chkPassword, password]);

    //유효성검사
    const validateInput = () => {
        //사용자 입력값의 유효성 판단
        let isValid = true;

        if (type === 'email') {
            if (!EMAIL_REGEX.test(value)) {
                setError(ERROR_MSG.emailPattern);
                isValid = false; // 유효하지 않으면 isValid를 false로 설정
            } else {
                setError(''); // 유효하면 에러 메시지 초기화
            }
        } else if (id === 'userPassword') {
            if (!PASSWORD_REGEX.test(value)) {
                setError(ERROR_MSG.passwordPattern);
                isValid = false;
            } else {
                setError('');
            }
        } else if (id === 'chkPassword') {
            if (value !== password) {
                setError(ERROR_MSG.matchPassword);
                isValid = false;
            } else {
                setError('');
            }
        } else if (id === 'userNickname') {
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
                if (birthDate >= today) {
                    setError(ERROR_MSG.futureDate);
                    isValid = false;
                } else {
                    setError('');
                }
            }
        } else if (id === 'loginPassword') {
            if (password === '') {
                setError(ERROR_MSG.loginPassword);
            } else {
                setError('');
            }
        }

        // 폼 전체의 유효성을 설정
        setIsFormValid(isValid);
    };

    //생일
    const handleDateChange = (e) => {
        //input = 숫자아닌 문자제거
        let input = e.target.value.replace(/\D/g, '').slice(0, 8);
        //입력된 숫자가 4자 이상인 경우, MM/DD/YYYY 형식으로 포맷
        if (input.length >= 4) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        }
        // 입력된 숫자가 2자 이상인 경우, MM/DD 형식으로 포맷
        else if (input.length >= 2) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        //변경된 값 부모 컴포넌트로 전달
        onChange({ ...e, target: { ...e.target, value: input } });
    };

    //password와 text를 전환해서 password 볼수있게 해줌
    const togglePasswordVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    //error가 있으면 input border 색상 red로 변경
    const inputStatus = error ? 'border-red' : 'border-gray-db';

    return (
        <div className='my-8 inline-flex h-auto w-auto flex-col items-start justify-start gap-2'>
            <label htmlFor={id} className='mb-3 text-16 text-black'>
                {label}
            </label>
            <div className='relative h-full w-full'>
                <input
                    type={inputType}
                    id={id}
                    placeholder={placeholder}
                    required
                    autoComplete='off'
                    className={`inline-flex h-50 items-center justify-start gap-2.5 rounded-4 border ${inputStatus} bg-white px-16 py-15 focus:border-strong ${className}`}
                    onChange={(e) => {
                        // id가 userBirth인 경우 handleDateChange() 함수 실행
                        if (id === 'userBirth') {
                            handleDateChange(e);
                        } else {
                            onChange(e);
                        }
                        // 입력 값이 변경될 때마다 유효성 검사를 실행
                        validateInput();
                    }}
                    value={value}
                />
                {type === 'password' && (
                    <button
                        type='button'
                        className='absolute right-4 mr-16 h-24 w-24 transform justify-center pt-14'
                        onClick={togglePasswordVisibility}
                    >
                        <img
                            src={inputType === 'password' ? disableEyes : enableEyes}
                            className='h-24 w-24 text-blue'
                        />
                    </button>
                )}
            </div>
            {error && <p className='mb-5 text-14 text-red'>{error}</p>}
        </div>
    );
};

export default FormInput;
