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

    const MEDIA_TYPE = 'movie';

    // 슬라이더 불러오기

    const renderSlider = (data, title) => (
        <Slider data={data} sliderTitle={title} mediaType={MEDIA_TYPE} />
    );

    return (
        <PageWrapper>
            {nowPlayingLoading || topRatedLoading || popularLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster
                        bigPosterValues={nowPlayingMovies.results[0]}
                        mediaType={MEDIA_TYPE}
                    />
                    {renderSlider(nowPlayingMovies, 'Now_Playing')}
                    {renderSlider(topRatedMovies, 'Top_Rated')}
                    {renderSlider(popularMovies, 'Up_Coming')}
                </>
            )}
        </PageWrapper>
    );
}
