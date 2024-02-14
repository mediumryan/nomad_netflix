import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// import icons
// import tv and movie data
import { getMovieDetails, getTvShowDetails } from '../api';
// import images
// import components
import { Loader } from './Movie';
import DetailPoster from '../Components/Detail/DetailPoster/DetailPoster';
import DetailDescription from '../Components/Detail/DetailDescription/DetailDescription';
import DetailVideo from '../Components/Detail/DetailVideo/DetailVideo';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { detailIsStory } from '../atom';

export const DetailWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.lighter};
    padding-bottom: 5rem;
`;

const DetailInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 5rem 2.5rem 0 2.5rem;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding-bottom: 10rem;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
`;

export const HorizontalLine = styled.div`
    margin: 2rem auto;
    width: 75%;
    height: 2px;
    background-color: ${(props) => props.theme.white.darker};
    opacity: 0.25;
`;

export default function Detail() {
    const { mediaType, id } = useParams();

    const setStory = useSetRecoilState(detailIsStory);

    useEffect(() => {
        setStory(false);
    }, []);

    // movie data
    const { data, isLoading } = useQuery(['detail', 'data'], () => {
        return mediaType === 'movie'
            ? getMovieDetails(id)
            : mediaType === 'tv'
            ? getTvShowDetails(id)
            : null;
    });

    return (
        <DetailWrapper>
            {isLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <DetailInner>
                    <DetailPoster data={data} mediaType={mediaType} />
                    <DetailDescription
                        data={data}
                        id={id}
                        mediaType={mediaType}
                    />
                    <DetailVideo id={id} mediaType={mediaType} />
                </DetailInner>
            )}
        </DetailWrapper>
    );
}
