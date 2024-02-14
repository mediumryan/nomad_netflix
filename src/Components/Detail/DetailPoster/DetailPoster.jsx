import { styled } from 'styled-components';
// import components
import Poster from './Poster';
import StoryToggle from './StoryToggle';
import Overview from './Overview';

export const DetailPosterWrapper = styled.div`
    position: relative;
    margin-top: 10%;
    width: 430px;
    height: 530px;
    box-shadow: rgba(255, 255, 255, 0.15) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 20px;
    overflow: hidden;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 320px;
        height: 450px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        grid-area: 1 / 1 / 2 / 2;
        margin-top: 15%;
        height: 650px;
    }
`;

export default function DetailPoster({ data, mediaType }) {
    return (
        <DetailPosterWrapper>
            <Poster data={data} />
            <StoryToggle data={data} mediaType={mediaType} />
            <Overview data={data} />
        </DetailPosterWrapper>
    );
}
