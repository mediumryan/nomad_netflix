import { styled } from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getImages } from '../../helper';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    },
};

const SliderWrapper = styled.div``;

const SliderTitle = styled.h5`
    margin: 5rem 0;
    padding-left: 1rem;
    color: ${(props) => props.theme.white.lighter};
    font-size: 1.5rem;
    font-style: italic;
`;

const SliderRowWrapper = styled.div`
    height: 325px;
    overflow: hidden;
`;

const SliderRow = styled(Carousel)`
    height: 100%;
    overflow: visible;
`;

const SliderDescription = styled.div`
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    color: ${(props) => props.theme.white.lighter};
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.5rem;
    transition: 300ms all;
`;

const SliderItem = styled.div`
    width: 100%;
    height: 100%;
    transition: 500ms all;
    transform-origin: center bottom;
    img {
        width: 100%;
        height: 100%;
    }
    &:hover {
        transform: translateY(-20px) scale(1.15);
    }
    &:hover ${SliderDescription} {
        display: flex;
    }
`;

const DescriptionTitle = styled.p`
    line-height: 1.5;
`;

const DescriptionVote = styled.p``;

export default function Slider({ data, sliderTitle, mediaType }) {
    return (
        <SliderWrapper>
            <SliderTitle>{sliderTitle}</SliderTitle>
            <SliderRowWrapper>
                <SliderRow
                    responsive={responsive}
                    infinite={true}
                    showDots={false}
                    rewind={true}
                    rewindWithAnimation={true}
                >
                    {data &&
                        data.results.map((item) => {
                            return (
                                <SliderItem>
                                    <img
                                        src={getImages(item.poster_path)}
                                        alt={item.title}
                                    />
                                    <SliderDescription>
                                        <DescriptionTitle>
                                            {item.title}
                                        </DescriptionTitle>
                                        <DescriptionVote>
                                            {item.vote_average.toFixed(1)}
                                        </DescriptionVote>
                                    </SliderDescription>
                                </SliderItem>
                            );
                        })}
                </SliderRow>
            </SliderRowWrapper>
        </SliderWrapper>
    );
}
