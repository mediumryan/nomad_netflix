import { styled } from 'styled-components';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getImages } from '../helper';
import MovieSlider from '../Components/MovieSlider';

const MovieWrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.black.darker};
`;

const Loader = styled.div`
    font-size: 48px;
    text-align: center;
`;

const BigPoster = styled(motion.div)`
    background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)),
        url(${(props) => props.bg_path});
    background-size: cover;
    background-position: center center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${(props) => props.theme.white.darker};
`;

const BigTitle = styled.h2`
    padding-left: 20px;
    font-size: 48px;
    margin-bottom: 48px;
`;

const BigStory = styled.p`
    padding-left: 20px;
    font-size: 18px;
    width: 50%;
    line-height: 1.5;
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
                    <BigPoster
                        bg_path={getImages(
                            nowPlayingMovies.results[0].poster_path
                        )}
                    >
                        <BigTitle>{nowPlayingMovies.results[0].title}</BigTitle>
                        <BigStory>
                            {nowPlayingMovies.results[0].overview}
                        </BigStory>
                    </BigPoster>
                    <MovieSlider data={nowPlayingMovies} />
                    <MovieSlider data={topRatedMovies} />
                    <MovieSlider data={popularMovies} />
                </>
            )}
        </MovieWrapper>
    );
}
