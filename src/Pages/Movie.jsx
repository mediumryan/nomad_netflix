import { styled } from 'styled-components';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import MovieSlider from '../Components/MovieSlider';
import MovieBigPoster from '../Components/MovieBigPoster';

export const MovieWrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.black.darker};
`;

export const Loader = styled.div`
    font-size: 48px;
    text-align: center;
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

    return (
        <MovieWrapper>
            {nowPlayingLoading || topRatedLoading || popularLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <MovieBigPoster
                        bigPosterValues={nowPlayingMovies.results[0]}
                    />
                    <MovieSlider
                        data={nowPlayingMovies}
                        sliderTitle="Now_Playing"
                    />
                    <MovieSlider
                        data={topRatedMovies}
                        sliderTitle="Top_Rated"
                    />
                    <MovieSlider data={popularMovies} sliderTitle="Up_Coming" />
                </>
            )}
        </MovieWrapper>
    );
}
