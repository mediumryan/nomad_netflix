import { styled } from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderItem from './SliderItem';

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
    margin: 2rem 0 1rem 0;
    padding-left: 1rem;
    color: ${(props) => props.theme.white.lighter};
    font-size: 1.5rem;
    font-style: italic;
`;

const SliderRow = styled(Carousel)`
    height: 375px;
`;

export default function Slider({ data, sliderTitle, mediaType }) {
    return (
        <SliderWrapper>
            <SliderTitle>{sliderTitle}</SliderTitle>
            <SliderRow
                responsive={responsive}
                infinite={true}
                showDots={false}
                rewind={true}
                rewindWithAnimation={true}
            >
                {data &&
                    data.results.map((item) => {
                        return <SliderItem item={item} mediaType={mediaType} />;
                    })}
            </SliderRow>
        </SliderWrapper>
    );
}
