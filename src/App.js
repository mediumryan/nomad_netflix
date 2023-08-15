import { styled } from 'styled-components';
import './CSS/index.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Movie from './Pages/Movie';
import Tv from './Pages/Tv';
import Search from './Pages/Search';
import NotFound from './Pages/NotFound';

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
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainWrapper>
    );
}

export default App;
