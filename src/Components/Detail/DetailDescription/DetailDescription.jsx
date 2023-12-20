import { styled } from 'styled-components';
// import components
import { HorizontalLine } from '../../../Pages/MovieDetail';
import DetailVoteAverage from './DetailVoteAverage';
import DetailCast from './DetailCast';

export const DetailDescriptionWrapper = styled.div`
    position: relative;
    transform: translateY(10%);
    width: 430px;
    height: 610px;
    padding: var(--padding-double-large);
    background-color: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.95));
    h2 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 700;
        font-style: italic;
    }
    p.vote {
        display: flex;
        align-items: center;
    }
    @media only screen and (max-width: 820px) {
        width: 100%;
    }
`;

export const DescriptionInner = styled.div`
    min-height: 85%;
    max-height: 85%;
    margin: 2rem;
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.black.lighter};
    overflow: scroll;
`;

export const DescriptionItem = styled.p`
    font-size: 0.9rem;
    line-height: 1.5;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    span.sub-title {
        font-size: 1.05rem;
        margin-bottom: 0.5rem;
        color: ${(props) => props.theme.white.darker};
    }
`;

export default function DetailDescription({ data, id }) {
    return (
        <DetailDescriptionWrapper>
            <h2>{data.title}</h2>
            <HorizontalLine />
            <DescriptionInner>
                <DescriptionItem>
                    <span className="sub-title">원제</span>
                    {data.original_title}
                </DescriptionItem>
                <DescriptionItem>
                    <span className="sub-title">장르</span>
                    {data.genres.map((genre) => genre.name).join(', ')}
                </DescriptionItem>
                <DescriptionItem>
                    <span className="sub-title">개봉일</span>
                    {data.release_date}
                </DescriptionItem>
                <DescriptionItem>
                    <span className="sub-title">런타임</span>
                    {Math.floor(data.runtime / 60)}
                    시간
                    {Math.floor(data.runtime % 60)}분
                </DescriptionItem>
                <DetailCast data={data} id={id} />
                <DetailVoteAverage data={data} />
            </DescriptionInner>
        </DetailDescriptionWrapper>
    );
}
