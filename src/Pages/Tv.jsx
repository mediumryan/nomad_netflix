import { styled } from 'styled-components';
import {
    getAiringTodayTvShows,
    getPopularTvShows,
    getTopRatedTvShows,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import { Loader, MovieWrapper } from './Movie';
import BigPoster from '../Components/BigPoster';
import Slider from '../Components/Slider/Slider';

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

    const MEDIA_TYPE = 'tv';

    return (
        <TvWrapper>
            {popularLoading || airingTodayLoading || topRatedLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster
                        bigPosterValues={popularTvShows.results[0]}
                        mediaType={MEDIA_TYPE}
                    />
                    <Slider
                        data={popularTvShows}
                        sliderTitle="Popular"
                        mediaType={MEDIA_TYPE}
                    />
                    <Slider
                        data={airingTodayTvShows}
                        sliderTitle="Airing_Today"
                        mediaType={MEDIA_TYPE}
                    />
                    <Slider
                        data={topRatedTvShows}
                        sliderTitle="Top_Rated"
                        mediaType={MEDIA_TYPE}
                    />
                </>
            )}
        </TvWrapper>
    );
}
