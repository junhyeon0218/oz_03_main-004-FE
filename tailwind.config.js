/** @type {import('tailwindcss').Config} */

const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i / 10}rem`) };
const rem0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };
const rem0_2000 = { ...Array.from(Array(2001)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: rem0_10,
      borderRadius: rem0_100,
      fontSize: rem0_100,
      lineHeight: rem0_100,
      minWidth: rem0_2000,
      minHeight: rem0_2000,
      spacing: rem0_2000,
      colors: {
        basic: '#DBB169',
        primary: '#8B4513', 
        strong: '#421D06',
        blue: '#3366FE',
        gray: {
          bg: '#EFEFEF', // 랜딩페이지 섹션 2 배경
          98: '#989898', // 푸터, input-플레이스 홀더 등 연한 글씨 / 인풋 기본 테두리
          db: '#BDBDBD', // 로그인 회원가입 페이지 버튼 비활성화 시 색상
          dc: '#DCDCDC', // 캘린더 이번 달 아닌 날 흐린 글씨 및 
          fa: '#FAFAFA', // 기술 스택 검색창 배경
          65: '#656565', // 경험치 글씨 색상
        },
        black: {
          DEFAULT: '#000',
          overlay: 'rgba(0, 0, 0, 0.50)', // 모달창 뒷 배경
        },
        red: '#F54025', // 투두 지우기, 계정 지우기
        green: '#1BCC73', // 투두 체크, 경험치 바
      },
      screens: {
        hwide: {max:'2260px'},
        wide: { max: '1920px' },
        middle: { max: '1600px' },
        1440: { max: '1440px' },
        tablet: { max: '1199px' },
        mobile: { max: '767px' },
      },
      boxShadow: {
        'custom-light': '0px 0px 4px 0px rgba(0, 0, 0, 0.10)', // 투두 등 메인 컴포넌트 안에 들어가는 작은 것들 그림자
        'custom-dark': '0px 0px 8px 0px rgba(0, 0, 0, 0.20)', // 메인 컴포넌트의 그림자
      },
      keyframes: {
        wave: {
          '0%': { marginLeft: '0' },
          '100%': { marginLeft: '-1600px' },
        },
        swell: {
          '0%, 100%': { transform: 'translate(0, -30px)' },
          '50%': { transform: 'translate(0, 5px)' },
        }, 
        twinkle: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '100%': { transform: 'translateY(0%)', opacity: '1' },
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
        },
      },
      animation: {
        wave: 'wave 7s linear infinite',
        swell: 'swell 4s linear infinite',
        twinkle: 'twinkle 3s linear infinite',
        'slide-down': 'slide-down 0.5s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-in-out',
      },
      aspectRatio: {
        '12/5': '12 / 5',
        '6/5': '6 / 5',
        '2/1': '2 / 1',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};