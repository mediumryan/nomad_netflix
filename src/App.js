import './CSS/index.css';
import { styled } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
// import components
import Header from './Components/Header/Header';
import GoToTop from './Components/GoToTop';
// import pages
import Movie from './Pages/Movie';
import Tv from './Pages/Tv';
import Search from './Pages/Search';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Detail from './Pages/Detail';

function App() {
    return (
        <main>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/tv" element={<Tv />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/detail/:mediaType/:id" element={<Detail />} />
                <Route path="/detail/:mediaType/:id" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <GoToTop />
        </main>
    );
}

export default App;
