import { styled } from 'styled-components';
// carousel
// import data
import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMovies, getPopularTvShows } from '../api';
import { Link } from 'react-router-dom';
import HomeCard from '../Components/Home/HomeCard';
import { useRecoilValue } from 'recoil';
import { menuState } from '../atom';

export const PageWrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.black.darker};
`;

const HomeInner = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5)),
        url('https://image.tmdb.org/t/p/original//7IEjgGVcOT3kTIb42yFLPVjSvot.jpg')
            center no-repeat;
    background-size: cover;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 100%;
        flex-direction: column;
        padding-bottom: 5rem;
    }
`;

const HomeCardBox = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    text-decoration: none;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        &:first-child {
            margin-top: ${(props) => (props.menu ? '15rem' : '7.5rem')};
            margin-bottom: 2rem;
        }
    }
`;

const HomeTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    font-size: 1.75rem;
    font-weight: 700;
    font-style: italic;
    margin: 2rem 0;
`;

export default function Home() {
    // movies
    const { data: homeMovieData, isLoading: homeMovieLoading } = useQuery(
        ['data', 'movie'],
        getNowPlayingMovies
    );
    // tv shows
    const { data: homeTvData, isLoading: homeTvLoading } = useQuery(
        ['data', 'tv'],
        getPopularTvShows
    );

    // menu active state
    const menu = useRecoilValue(menuState);

    return (
        <PageWrapper>
            <HomeInner>
                <HomeCardBox to="/movie" menu={menu}>
                    <HomeTitle>Movies</HomeTitle>
                    <HomeCard data={homeMovieData} loading={homeMovieLoading} />
                </HomeCardBox>
                <HomeCardBox to="/tv">
                    <HomeTitle>Tv Shows</HomeTitle>
                    <HomeCard data={homeTvData} loading={homeTvLoading} />
                </HomeCardBox>
            </HomeInner>
        </PageWrapper>
    );
}
