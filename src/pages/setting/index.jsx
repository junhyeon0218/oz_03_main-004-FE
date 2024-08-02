import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/input/index';
import BaekjoonConnectModal from '../../components/modal/BaekjoonConnectModal';
import Alert from '../../components/common/alert';
import { settingPageService } from '../../apis/services/settingPageService';
import { authAPI } from '../../apis/api/auth';
import useUser from '../../store/userStore';

const Setting = () => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState({ nickname: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [baekjoonId, setBaekjoonId] = useState('');
    const [isBaekjoonConnected, setIsBaekjoonConnected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const setUser = useUser((state) => state.setUser);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const userData = await authAPI.getProfile();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            navigate('/landing');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [setUser]);

    // Nickname에 error 또는 빈 input 인지 확인
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
    };
    const hideAlert = () => {
        setAlert({ show: false, message: '', type: 'success' });
    };

    const validateForm = () => {
        return Object.values(error).every((err) => !err) && nickname.trim() !== '';
    };

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await settingPageService.getUserProfile();
                setNickname(data.nickname);
                setBaekjoonId(data.baekjoonId);
                setIsBaekjoonConnected(data.baekjoonId !== null && data.baekjoonId !== '');
            } catch (error) {
                console.error('Error fetching user profile', error);
                console.error('Error fetching user profile', error);
            }
        };

        getUserProfile();
    }, []);

    const handleClickNicknameInput = () => {
        setIsEditing(true);
    };

    const handleChangeNickname = async () => {
        if (validateForm()) {
            try {
                await authAPI.updateNickname(nickname);

                setError({ ...error, nickname: '' });

                setIsEditing(false);
                showAlert('Nickname updated successfully');
            } catch (error) {
                console.error('Failed to change nickname', error);
                showAlert('Failed to change nickname. Please try again.', 'error');
            }
        } else {
            setError({ ...error, nickname: 'Please enter a valid nickname' });
        }
    };

    const handleConnect = (platform) => {
        if (platform === 'Baekjoon') {
            setIsModalOpen(true);
        }
    };

    const handleBaekjoonConnectSuccess = () => {
        showAlert('Baekjoon connected successfully');
        setIsBaekjoonConnected(true);
    };

    //todo 계정삭제부분은 물어보기 > 아직 API 안만들었다고함 만들예정 > 이후에 코드도 수정하기
    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? \nThis action cannot be undone.'
        );
        if (confirmed) {
            try {
                // await authAPI.deleteAccount(userId);
                alert('Account deleted successfully');
                navigate('/');
            } catch (error) {
                console.error('Failed to delete your account', error);
                alert('Failed to delete your account. Please try again.');
            }
        }
    };

    return (
        <div className='m-ful flex h-full w-full flex-col items-center'>
            <div className='relative h-250 w-[calc(100%-500px)] min-w-627 pt-50'>
                <h1 className='h-auto min-w-0 border-b border-gray-300 text-32'>General</h1>
                <div className='mt-15'>
                    <div className='flex items-start'>
                        <div className='h-150'>
                            {isEditing ? (
                                <FormInput
                                    id='userNickname'
                                    label='My Nickname'
                                    type='text'
                                    placeholder='Please Enter Your Nickname'
                                    error={error.nickname}
                                    setError={(errorMsg) => setError({ ...error, nickname: errorMsg })}
                                    onChange={(e) => setNickname(e.target.value)}
                                    value={nickname}
                                    isFormValid={isFormValid}
                                    setIsFormValid={setIsFormValid}
                                    className='w-520'
                                />
                            ) : (
                                <div className='my-8 inline-flex h-auto w-auto flex-col items-start justify-start gap-2'>
                                    <label className='mb-3 text-16 text-black'>My Nickname</label>
                                    <span
                                        onClick={handleClickNicknameInput}
                                        className='inline-flex h-50 min-w-100 cursor-pointer items-center justify-start gap-2.5 rounded-4 border bg-white px-16 py-15'
                                    >
                                        {nickname}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleChangeNickname}
                            className={`${
                                isEditing ? 'bg-primary' : 'bg-gray-db'
                            } ml-4 mt-40 h-44 w-101 rounded text-white duration-200 hover:scale-105`}
                            disabled={!isEditing}
                        >
                            Rename
                        </button>
                    </div>
                </div>
            </div>
            <div className='relative h-250 w-[calc(100%-500px)] min-w-627 pt-50'>
                <h1 className='h-auto min-w-0 border-b border-gray-300 text-32'>Connect</h1>
                <div className='mt-15 flex w-520 flex-col'>
                    <div className='mt-15 flex w-520 flex-col'>
                        <div className='ml-3 flex h-55 w-300 items-center justify-between'>
                            <span className='flex items-center'>
                                <img src='/images/potato.png' className='h-42 w-42 rounded-full bg-gray-98' />
                                <p className='ml-5 text-20'>Baekjoon</p>
                            </span>
                            <button
                                className={`left-535 top-142 ml-4 h-44 w-108 rounded text-16 text-white duration-200 hover:scale-105 ${
                                    isBaekjoonConnected ? 'bg-gray-db' : 'bg-primary'
                                }`}
                                onClick={() => handleConnect('Baekjoon')}
                            >
                                {isBaekjoonConnected ? 'Connected' : 'Connect'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative h-250 w-[calc(100%-500px)] min-w-627 pt-50'>
                <h1 className='h-auto min-w-0 border-b border-gray-300 text-32'>Danger</h1>
                <div className='mt-15 flex w-520 flex-col'>
                    <div className='flex h-55 w-866 items-center'>
                        <div className='mt-15 flex w-520 flex-col'>
                            <div className='flex h-55 w-866 items-center'>
                                <span>
                                    <p className='font-bold'>Delete your Account</p>
                                    <p className='w-688 text-14'>
                                        Your potato data will be permanently deleted. This action cannot be undone.
                                        Please confirm your decision.
                                    </p>
                                </span>
                                <button
                                    type='button'
                                    onClick={handleDeleteAccount}
                                    className='mr-3 h-44 w-147 rounded bg-[#f3f3f3] text-16 text-red duration-200 hover:scale-105'
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                    <BaekjoonConnectModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={handleBaekjoonConnectSuccess}
                        baekjoonId={baekjoonId}
                    />
                    {alert.show && <Alert text={alert.message} type={alert.type} onClose={hideAlert} />}
                </div>
            </div>
        </div>
    );
};

export default Setting;
