import { styled } from 'styled-components';
// carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import data
import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMovies, getPopularTvShows } from '../api';
import { getImages } from '../helper';

export const PageWrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.black.darker};
`;

const HomeInner = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
`;

const HomeCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
`;

const HomeTitle = styled.h3`
    color: red;
    font-size: 1.5rem;
    margin: 1rem 0;
`;

const HomeCard = styled(Carousel)`
    width: 350px;
    img {
        width: 100%;
        border-radius: 20px;
    }
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

    return (
        <PageWrapper>
            <HomeInner>
                <HomeCardWrapper>
                    <HomeTitle>Movies</HomeTitle>
                    <HomeCard
                        autoPlay={true}
                        infiniteLoop={true}
                        interval={1500}
                        showIndicators={false}
                        showArrows={false}
                        showThumbs={false}
                        showStatus={false}
                        dynamicHeight={true}
                    >
                        {homeMovieData &&
                            homeMovieData.results.map((item) => {
                                return (
                                    <img src={getImages(item.poster_path)} />
                                );
                            })}
                    </HomeCard>
                </HomeCardWrapper>
                <HomeCardWrapper>
                    <HomeTitle>Tv Shows</HomeTitle>
                    <HomeCard
                        autoPlay={true}
                        infiniteLoop={true}
                        interval={1500}
                        showIndicators={false}
                        showArrows={false}
                        showThumbs={false}
                        showStatus={false}
                        dynamicHeight={true}
                    >
                        {homeTvData &&
                            homeTvData.results.map((item) => {
                                return (
                                    <img src={getImages(item.poster_path)} />
                                );
                            })}
                    </HomeCard>
                </HomeCardWrapper>
            </HomeInner>
        </PageWrapper>
    );
}
