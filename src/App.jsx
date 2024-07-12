import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import './styles/global.css';
import Landing from './pages/landing';
import Signup from './pages/Signup';
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
