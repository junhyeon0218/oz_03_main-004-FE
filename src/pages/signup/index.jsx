import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/input/index';

const Signup = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [chkPassword, setChkPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState({ email: '', password: '', chkPassword: '', nickname: '', birth: '' });
    //input 빈칸 확인
    const [isFormValid, setIsFormValid] = useState(false);

    //input 빈칸확인 && 유효성검사후 error가 없는지
    const validateForm = () => {
        if (step === 1) {
            return (
                Object.values(error).every((err) => !err) && // error message 없을때
                email.trim() !== '' &&
                password.trim() !== '' &&
                chkPassword.trim() !== ''
            );
        } else if (step === 2) {
            return (
                Object.values(error).every((err) => !err) && // error message 없을때
                nickname.trim() !== '' &&
                birth.trim() !== ''
            );
        }
    };

    const onClickNext = () => {
        setStep(2);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log(email, password, chkPassword, nickname, birth);
        if (validateForm()) {
            console.log('Form submitted!');
            alert('Sing Up Successful!');
            navigate('/signin');
        } else {
            console.error('Form validation failed. Please check the form for errors.');
        }
    };

    return (
        <>
            <div className='m-auto flex h-[100vh] flex-col items-center justify-center'>
                <div
                    className='h-48 cursor-pointer text-48 font-bold text-strong'
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    GitPotato
                </div>
                <p className='my-38 text-20 font-normal'>"Sign Up and Grow Your Potato!"</p>
                <form className='flex flex-col justify-center'>
                    {step === 1 && (
                        <>
                            <FormInput
                                id='userEmail'
                                label='Email'
                                type='email'
                                placeholder='Please Enter Your Email'
                                error={error.email}
                                setError={(errorMsg) => setError({ ...error, email: errorMsg })}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                isFormValid={isFormValid}
                                setIsFormValid={setIsFormValid}
                            />
                            <FormInput
                                id='userPassword'
                                label='Password'
                                type='password'
                                placeholder='Please Enter Your Password'
                                error={error.password}
                                setError={(errorMsg) => setError({ ...error, password: errorMsg })}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                isFormValid={isFormValid}
                                setIsFormValid={setIsFormValid}
                            />
                            <FormInput
                                id='chkPassword'
                                label='Confirm Password'
                                type='password'
                                placeholder='Please Enter Your Password Again'
                                error={error.chkPassword}
                                setError={(errorMsg) => setError({ ...error, chkPassword: errorMsg })}
                                onChange={(e) => setChkPassword(e.target.value)}
                                value={chkPassword}
                                isFormValid={isFormValid}
                                setIsFormValid={setIsFormValid}
                                password={password}
                            />
                            <button
                                type='button'
                                onClick={onClickNext}
                                disabled={!validateForm()} // Disable button if form is not valid
                                className={`my-8 inline-flex h-50 w-520 items-center justify-center gap-2.5 whitespace-nowrap rounded px-236 py-3.5 text-white ${validateForm() ? 'bg-primary' : 'bg-gray-db'}`}
                            >
                                Next
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormInput
                                id='userNickname'
                                label='Nickname'
                                type='nickname'
                                placeholder='Please Enter Your Nickname'
                                error={error.nickname}
                                setError={(errorMsg) => setError({ ...error, nickname: errorMsg })}
                                onChange={(e) => setNickname(e.target.value)}
                                value={nickname}
                                isFormValid={isFormValid}
                                setIsFormValid={setIsFormValid}
                            />
                            <FormInput
                                id='userBirth'
                                label='Birth'
                                type='text'
                                placeholder='MM/DD/YYYY'
                                error={error.birth}
                                setError={(errorMsg) => setError({ ...error, birth: errorMsg })}
                                onChange={(e) => setBirth(e.target.value)}
                                value={birth}
                                isFormValid={isFormValid}
                                setIsFormValid={setIsFormValid}
                            />
                            <button
                                type='submit'
                                onClick={onSubmit}
                                disabled={!validateForm()} // Disable button if form is not valid
                                className={`my-8 inline-flex h-50 w-520 items-center justify-center gap-2.5 whitespace-nowrap rounded px-236 py-3.5 text-white ${validateForm() ? 'bg-primary' : 'bg-gray-db'}`}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </form>
                <div className='mt-24 flex justify-center'>
                    <p className='mr-10 text-16'>Already Have an ID?</p>
                    <a href='/signin' className='text-16 hover:text-blue hover:underline'>
                        Sign In
                    </a>
                </div>
            </div>
        </>
    );
};

export default Signup;
