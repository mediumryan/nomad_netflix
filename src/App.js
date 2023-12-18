import './CSS/index.css';
import { styled } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
// import components
import Header from './Components/Header/Header';
// import pages
import Movie from './Pages/Movie';
import Tv from './Pages/Tv';
import Search from './Pages/Search';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Detail from './Pages/Detail';

const MainWrapper = styled.main``;

function App() {
    return (
        <MainWrapper>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/tv" element={<Tv />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/search/:query/:id" element={<Search />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainWrapper>
    );
}

export default App;
