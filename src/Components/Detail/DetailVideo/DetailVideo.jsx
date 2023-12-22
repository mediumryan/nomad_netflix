import { styled } from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@tanstack/react-query';
// import data
import { getMovieVideos, getTvShowVideos } from '../../../api';
import { HorizontalLine } from '../../../Pages/Detail';

export const VideoWrapper = styled.div`
    width: 430px;
    height: 610px;
    transform: translateY(10%);
    display: flex;
    flex-direction: column;
    align-items: center;
    & > h2 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 700;
        font-style: italic;
        color: ${(props) => props.theme.red};
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 320px;
        height: 450px;
    }
`;

export const VideoInner = styled.div`
    border: 2px solid ${(props) => props.theme.black.lighter};
    border-radius: 20px;
    padding: 0 1rem;
    min-height: 85%;
    max-height: 85%;
`;

export const NoVideo = styled.p`
    font-size: 1.5rem;
    padding-top: 5rem;
`;

export const VideoContents = styled(Carousel)`
    position: relative;
    max-width: 430px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        max-width: 320px;
    }
`;

export const VideoTitle = styled.div`
    font-size: 1.15rem;
    text-align: center;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 2px;
    margin-bottom: 2rem;
`;

export const VideoItem = styled.iframe`
    width: 250px;
    border-radius: 20px;
`;

export default function DetailVideo({ id, mediaType }) {
    const { data: videoData, isLoading: videoDataIsLoading } = useQuery(
        ['detail', 'video'],
        () => {
            return mediaType === 'movie'
                ? getMovieVideos(id)
                : mediaType === 'tv' && getTvShowVideos(id);
        }
    );

    return (
        <VideoWrapper>
            <h2>Trailer</h2>
            <HorizontalLine />
            {videoDataIsLoading ? (
                'Loading...'
            ) : videoData.results.length === 0 ? (
                <NoVideo>' 동영상 샘플이 존재하지 않습니다. 🥲'</NoVideo>
            ) : (
                <VideoInner>
                    <VideoContents showStatus={false}>
                        {videoData.results.map((_, index) => {
                            return (
                                <div key={index}>
                                    <VideoTitle>
                                        <h2>{videoData.results[index].name}</h2>
                                    </VideoTitle>

                                    <VideoItem
                                        key={videoData.results[index].id}
                                        src={`https://www.youtube.com/embed/${videoData.results[index].key}`}
                                        title={videoData.results[index].key}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />
                                </div>
                            );
                        })}
                    </VideoContents>
                </VideoInner>
            )}
        </VideoWrapper>
    );
}
