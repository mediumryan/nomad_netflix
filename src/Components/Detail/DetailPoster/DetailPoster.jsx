import { styled } from 'styled-components';
// import components
import Poster from './Poster';
import StoryToggle from './StoryToggle';
import Overview from './Overview';

export const DetailItemWrapper = styled.div`
    position: relative;
    width: 30%;
    height: 600px;
    box-shadow: rgba(255, 255, 255, 0.15) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 20px;
    overflow: hidden;
    padding: 1rem 0.5rem;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 100%;
        margin: 1rem 0;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
    }
`;

export default function DetailPoster({ data, mediaType }) {
    return (
        <DetailItemWrapper>
            <Poster data={data} />
            <StoryToggle data={data} mediaType={mediaType} />
            <Overview data={data} />
        </DetailItemWrapper>
    );
}
