import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Signin from './pages/signin';

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
                <Route path='landing' element={<Landing />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
        </Routes>
    );
}

export default App;
