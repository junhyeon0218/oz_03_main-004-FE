import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/layout/header';
import Landing from './pages/landing';
import Signin from './pages/signin';
import Home from './pages/home';
import Setting from './pages/setting';
import OAuthCallback from './pages/oauthCallback';
import React from 'react';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Navigate to='/landing' />} />
                <Route path='landing' element={<Landing />} />
                <Route path='home' element={<Home />} />
                <Route path='setting' element={<Setting />} />
            </Route>
            <Route path='/signin' element={<Signin />} />
            <Route path='/oauth-callback' element={<OAuthCallback />} />
        </Routes>
    );
}

export default App;
