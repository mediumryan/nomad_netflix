import { styled } from 'styled-components';
import {
    getAiringTodayTvShows,
    getPopularTvShows,
    getTopRatedTvShows,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import TvSlider from '../Components/TvSlider';
import TvBigPoster from '../Components/TvBigPoster';
import { Loader, MovieWrapper } from './Movie';

const TvWrapper = styled(MovieWrapper)`
    height: 100%;
    background-color: ${(props) => props.theme.black.darker};
`;

export default function Tv() {
    // TV 데이터 받아오기
    const { data: popularTvShows, isLoading: popularLoading } = useQuery(
        ['tv', 'popular'],
        getPopularTvShows
    );
    const { data: airingTodayTvShows, isLoading: airingTodayLoading } =
        useQuery(['tv', 'airingToday'], getAiringTodayTvShows);
    const { data: topRatedTvShows, isLoading: topRatedLoading } = useQuery(
        ['tv', 'topRated'],
        getTopRatedTvShows
    );

    return (
        <TvWrapper>
            {popularLoading || airingTodayLoading || topRatedLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <TvBigPoster bigPosterValues={popularTvShows.results[0]} />
                    <TvSlider data={popularTvShows} sliderTitle="Popular" />
                    <TvSlider
                        data={airingTodayTvShows}
                        sliderTitle="Airing_Today"
                    />
                    <TvSlider data={topRatedTvShows} sliderTitle="Top_Rated" />
                </>
            )}
        </TvWrapper>
    );
}
