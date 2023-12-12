import {
    getAiringTodayTvShows,
    getPopularTvShows,
    getTopRatedTvShows,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './Movie';
import BigPoster from '../Components/BigPoster';
import Slider from '../Components/Slider/Slider';
import { PageWrapper } from './Home';

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
    // 슬라이더 불러오기
    const renderSlider = (data, title) => (
        <Slider data={data} sliderTitle={title} mediaType={MEDIA_TYPE} />
    );

    return (
        <PageWrapper>
            {popularLoading || airingTodayLoading || topRatedLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster
                        bigPosterValues={popularTvShows.results[0]}
                        mediaType={MEDIA_TYPE}
                    />
                    {renderSlider(popularTvShows, 'Popular')}
                    {renderSlider(airingTodayTvShows, 'Airing_Today')}
                    {renderSlider(topRatedTvShows, 'Top_Rated')}
                </>
            )}
        </PageWrapper>
    );
}
