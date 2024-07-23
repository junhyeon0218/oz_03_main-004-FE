import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/layout/header';
import Landing from './pages/landing';
import Signin from './pages/signin';
import Home from './pages/home';
import Setting from './pages/setting';
import Profile from './pages/profile';

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
                <Route path='/home' element={<Home />} />
                <Route path='home/:id' element={<Home />} />
                <Route path='setting/:id' element={<Setting />} />
            </Route>
            <Route path='/signin' element={<Signin />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    );
}

export default App;
