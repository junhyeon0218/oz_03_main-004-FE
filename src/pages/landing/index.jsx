import React from 'react';
import Footer from '../../components/layout/footer';
import { useNavigate } from 'react-router-dom';

const Section1 = () => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-center w-full px-10 overflow-hidden h-512'>
            <div className='flex flex-col items-center justify-center h-full mx-auto w-1400'>
                <div className='flex items-center justify-between w-full tablet:flex-col'>
                    <div className='z-30'>
                        <img src='/images/section1.png' alt='' />
                    </div>

                    <div className='z-20 tablet:flex tablet:flex-col tablet:items-center tablet:justify-center'>
                        <h1 className='font-bold text-40 text-strong tablet:text-32'>
                            Grow Your Potato
                            <span className='text-28'> with </span>
                            GitHub Commits
                        </h1>
                        <p className='font-semibold mt-21 text-20'>
                            The fun experience of growing potatoes <br /> through coding activity
                        </p>
                        <button
                            className='font-bold text-white duration-200 mt-26 h-44 w-90 rounded-4 bg-primary hover:scale-105'
                            onClick={() => navigate('/signin')}
                        >
                            Get Start
                        </button>
                    </div>
                </div>
                <img
                    src='/images/pipe.png'
                    alt=''
                    className='absolute right-[-200px] z-10 w-1500 wide:w-1200 tablet:hidden'
                />
                <div className='relative bottom-[-230px] left-0 h-5 w-full tablet:hidden'>
                    <div className="absolute left-0 top-[-198px] h-198 w-[6400px] animate-wave bg-[url('/images/wave2.png')] bg-repeat-x"></div>
                    <div className="absolute left-0 top-[-168px] h-198 w-[6400px] animate-swell bg-[url('/images/wave.png')] bg-repeat-x opacity-100"></div>
                </div>
            </div>
        </div>
    );
};

const Section2 = () => {
    return (
        <div className='flex items-center justify-center w-full px-10 overflow-hidden h-512 bg-gray-bg'>
            <div className='flex items-center justify-between h-full mx-auto w-1400 tablet:flex-col-reverse'>
                <div className='flex flex-col items-end tablet:items-center'>
                    <h1 className='font-bold text-40 text-strong tablet:text-32'>
                        Plan Your Day with To-Do and Calendar!
                    </h1>
                    <p className='font-semibold mt-28 text-20 tablet:mt-15'>
                        Stay Organized and On Track with Daily To-Do Lists
                    </p>
                    <p className='font-semibold mt-28 text-20 tablet:mt-15'>
                        Visualize Your Progress with an Intuitive Calendar
                    </p>
                    <p className='font-semibold mt-28 text-20 tablet:my-15'>
                        Seamlessly Sync Your Tasks and Events for Maximum Efficiency
                    </p>
                </div>

                <div className='tablet:w-300'>
                    <img src='/images/section2.png' alt='' />
                </div>
            </div>
        </div>
    );
};

const Section3 = () => {
    return (
        <div className='flex items-center justify-center w-full px-10 overflow-hidden h-512'>
            <div className='flex items-center justify-between h-full mx-auto w-1400 tablet:flex-col'>
                <div className='tablet:w-450'>
                    <img src='/images/section3.png' alt='' />
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-40 text-strong tablet:text-32'>Verified User Reviews</h1>
                    <p className='w-2/3 ml-0 mr-auto font-semibold mt-28 text-20 tablet:mt-15 tablet:w-4/5'>
                        This app has made coding so much more fun! Watching my potato grow with each commit is
                        incredibly motivating. <span className='text-16 text-gray-98'>- John Doe</span>
                    </p>

                    <p className='w-2/3 ml-auto mr-0 font-semibold mt-28 text-20 tablet:mt-15 tablet:w-4/5'>
                        The to-do and calendar features are fantastic. They help me stay organized and on track with my
                        projects. <span className='text-16 text-gray-98'>- Jane</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const Landing = () => {
    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Footer />
        </>
    );
};

export default Landing;
