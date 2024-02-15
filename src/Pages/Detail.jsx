import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// import tv and movie data
import { getMovieDetails, getTvShowDetails } from '../api';
// import components
import { Loader } from './Movie';
import DetailPoster from '../Components/Detail/DetailPoster/DetailPoster';
import DetailDescription from '../Components/Detail/DetailDescription/DetailDescription';
import DetailVideo from '../Components/Detail/DetailVideo/DetailVideo';
// import state data
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
    padding-bottom: 2rem;
`;

const DetailInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 5rem 2.5rem 0 2.5rem;
    margin-top: 5rem;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        margin: 0;
        flex-direction: column;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
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
