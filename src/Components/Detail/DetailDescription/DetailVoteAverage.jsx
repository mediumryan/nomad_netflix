import { styled } from 'styled-components';
import { DescriptionItem } from './DetailDescription';

export const Stars = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    span.star-number {
        margin-left: 0.5rem;
    }
`;

export const Star = styled.span`
    display: flex;
    align-items: center;
    width: 8px;
    height: 20px;
    margin-right: 2.5px;
    border-radius: 1px;
`;

export default function DetailVoteAverage({ data }) {
    const starArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <DescriptionItem>
            <span className="sub-title">평점</span>
            <Stars>
                {starArr.map((_, index) => {
                    return (
                        <Star
                            key={index}
                            index={index}
                            style={{
                                backgroundColor:
                                    data.vote_average.toFixed(1) >= index + 1
                                        ? '#fc0'
                                        : '#fff',
                            }}
                        />
                    );
                })}
                <span className="star-number">
                    ({data.vote_average.toFixed(1)})
                </span>
            </Stars>
        </DescriptionItem>
    );
}
