import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Setting from './pages/setting';

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
                <Route path='setting' element={<Setting />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
        </Routes>
    );
}

export default App;
