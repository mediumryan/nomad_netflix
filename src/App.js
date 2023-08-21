import { styled } from 'styled-components';
import './CSS/index.css';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Movie from './Pages/Movie';
import Tv from './Pages/Tv';
import Search from './Pages/Search';
import NotFound from './Pages/NotFound';
import MovieDetail from './Pages/MovieDetail';
import TvDetail from './Pages/TvDetail';

const MainWrapper = styled.div``;

function App() {
    return (
        <MainWrapper>
            <Header />
            <Routes>
                <Route path="/" element={<Movie />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/tv" element={<Tv />} />
                <Route path="/tv/:id" element={<Tv />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/search/:query/:id" element={<Search />} />
                <Route path="/movie/detail/:id" element={<MovieDetail />} />
                <Route path="/tv/detail/:id" element={<TvDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainWrapper>
    );
}

export default App;
