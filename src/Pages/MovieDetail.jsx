import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// import icons
// import tv and movie data
import { getMovieDetails } from '../api';
// import images
// import components
import { Loader } from './Movie';
import DetailPoster from '../Components/Detail/DetailPoster/DetailPoster';
import DetailDescription from '../Components/Detail/DetailDescription/DetailDescription';
import DetailVideo from '../Components/Detail/DetailVideo/DetailVideo';

export const DetailWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.lighter};
`;

const DetailInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 5rem 2.5rem 0 2.5rem;
`;

export const HorizontalLine = styled.div`
    margin: 2rem auto;
    width: 75%;
    height: 2px;
    background-color: ${(props) => props.theme.white.darker};
    opacity: 0.25;
`;

export default function MovieDetail() {
    const { id } = useParams();
    // movie data
    const { data: detailData, isLoading: detailDataIsLoading } = useQuery(
        ['detail', 'data'],
        () => {
            return getMovieDetails(id);
        }
    );

    return (
        <DetailWrapper>
            {detailDataIsLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <DetailInner>
                    <DetailPoster data={detailData} />
                    <DetailDescription data={detailData} id={id} />
                    <DetailVideo id={id} />
                </DetailInner>
            )}
        </DetailWrapper>
    );
}
