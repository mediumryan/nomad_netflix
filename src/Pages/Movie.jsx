import { styled } from 'styled-components';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import BigPoster from '../Components/BigPoster';
import Slider from '../Components/Slider/Slider';
import { PageWrapper } from './Home';

export const Loader = styled.div`
    position: absolute;
    top: 30%;
    font-size: var(--font-size-large);
    text-align: center;
`;

const MovieInner = styled.div`
    background-color: ${(props) => props.theme.black.darker};
    padding: 0 1rem 3rem 1rem;
`;

export default function Movie() {
    // 영화 데이터 받아오기
    const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useQuery(
        ['movies', 'nowPlaying'],
        getNowPlayingMovies
    );
    const { data: topRatedMovies, isLoading: topRatedLoading } = useQuery(
        ['movies', 'topRated'],
        getTopRatedMovies
    );
    const { data: popularMovies, isLoading: popularLoading } = useQuery(
        ['movies', 'popular'],
        getPopularMovies
    );

    // 슬라이더 불러오기

    const renderSlider = (data, title) => (
        <Slider data={data} sliderTitle={title} mediaType="movie" />
    );

    return (
        <PageWrapper>
            <MovieInner>
                {nowPlayingLoading || topRatedLoading || popularLoading ? (
                    <Loader>Loading ...</Loader>
                ) : (
                    <>
                        <BigPoster
                            bigPosterValues={nowPlayingMovies.results[0]}
                            mediaType="movie"
                        />
                        {renderSlider(nowPlayingMovies, 'Now_Playing')}
                        {renderSlider(topRatedMovies, 'Top_Rated')}
                        {renderSlider(popularMovies, 'Upcoming')}
                    </>
                )}
            </MovieInner>
        </PageWrapper>
    );
}
