import { styled } from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@tanstack/react-query';
// import data
import { getMovieVideos, getTvShowVideos } from '../../../api';
// import components
import { HorizontalLine } from '../../../Pages/Detail';
import { DetailItemWrapper } from '../DetailPoster/DetailPoster';
import {
    DetailItemInner,
    DetailSubTitle,
} from '../DetailDescription/DetailDescription';

export const NoVideo = styled.p`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.25rem;
    line-height: 1.5;
    letter-spacing: 2px;
    text-align: center;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
    }
`;

const VideoInner = styled(DetailItemInner)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

export const VideoContents = styled(Carousel)`
    width: 100%;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
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
    border-radius: 10px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
    }
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
        <DetailItemWrapper style={{ position: 'relative' }}>
            <DetailSubTitle>Trailer</DetailSubTitle>
            <HorizontalLine />
            {videoDataIsLoading ? (
                'Loading...'
            ) : videoData.results.length === 0 ? (
                <NoVideo>' 동영상 샘플이 존재하지 않습니다🥲'</NoVideo>
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
        </DetailItemWrapper>
    );
}
