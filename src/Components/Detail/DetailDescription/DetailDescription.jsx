import { styled } from 'styled-components';
// import components
import { HorizontalLine } from '../../../Pages/Detail';
import DetailVoteAverage from './DetailVoteAverage';
import DescriptionCast from './DescriptionCast';
import DescriptionAdult from './DescriptionAdult';
import { DetailItemWrapper } from '../DetailPoster/DetailPoster';

export const DetailSubTitle = styled.h2`
    text-align: center;
    font-size: 1.25rem;
    text-shadow: #fc0 1px 0 10px;
`;

export const DetailItemInner = styled.div`
    position: relative;
    height: 85%;
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.black.lighter};
    overflow: scroll;
`;

export const DescriptionItem = styled.p`
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    line-height: 1.5;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    span.sub-title {
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
        color: ${(props) => props.theme.white.darker};
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
    }
`;

export default function DetailDescription({ data, id, mediaType }) {
    return (
        <DetailItemWrapper>
            <DetailSubTitle>
                {mediaType === 'movie'
                    ? data.title
                    : mediaType === 'tv' && data.name}
            </DetailSubTitle>
            <HorizontalLine />
            <DetailItemInner>
                <DescriptionItem>
                    <span className="sub-title">원제</span>
                    {mediaType === 'movie'
                        ? data.original_title
                        : mediaType === 'tv' && data.original_name}
                </DescriptionItem>
                <DescriptionItem>
                    <span className="sub-title">장르</span>
                    {data.genres.map((genre) => genre.name).join(', ')}
                </DescriptionItem>
                <DescriptionItem
                    style={{
                        display: mediaType === 'movie' ? 'flex' : 'none',
                    }}
                >
                    <span className="sub-title">개봉일</span>
                    {data.release_date}
                </DescriptionItem>
                <DescriptionItem
                    style={{
                        opacity: mediaType === 'movie' ? '1' : '0',
                    }}
                >
                    <span className="sub-title">런타임</span>
                    {Math.floor(data.runtime / 60)}
                    시간
                    {Math.floor(data.runtime % 60)}분
                </DescriptionItem>
                <DescriptionCast id={id} mediaType={mediaType} />
                <DetailVoteAverage data={data} />
                <DescriptionAdult data={data} />
            </DetailItemInner>
        </DetailItemWrapper>
    );
}
