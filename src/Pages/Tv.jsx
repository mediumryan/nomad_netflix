import { styled } from 'styled-components';
import {
    getAiringTodayTvShows,
    getPopularTvShows,
    getTopRatedTvShows,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getImages } from '../helper';
import TvSlider from '../Components/TvSlider';

const TvWrapper = styled.div`
    height: 100%;
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

export default function Tv() {
    // 영화 데이터 받아오기
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

    console.log(popularTvShows.results);

    return (
        <TvWrapper>
            {popularLoading || airingTodayLoading || topRatedLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster
                        bg_path={getImages(
                            popularTvShows.results[0].poster_path
                        )}
                    >
                        <BigTitle>{popularTvShows.results[0].name}</BigTitle>
                        <BigStory>
                            {popularTvShows.results[0].overview}
                        </BigStory>
                    </BigPoster>
                    <TvSlider data={popularTvShows} />
                    <TvSlider data={airingTodayTvShows} />
                    <TvSlider data={topRatedTvShows} />
                </>
            )}
        </TvWrapper>
    );
}
