import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { styled } from 'styled-components';
// get image
import { getImages } from '../../helper';

const HomeCardWrapper = styled(Carousel)`
    width: 350px;
    height: 525px;
    div {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 250px;
        height: 375px;
    }
`;

export default function HomeCard({ data, loading }) {
    return (
        <HomeCardWrapper
            autoPlay={true}
            infiniteLoop={true}
            interval={1500}
            showIndicators={false}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            dynamicHeight={true}
        >
            {data &&
                data.results.map((item) => {
                    return (
                        <div>
                            {loading ? (
                                'Loading...'
                            ) : (
                                <img
                                    src={getImages(item.poster_path)}
                                    alt={item.title}
                                />
                            )}
                        </div>
                    );
                })}
        </HomeCardWrapper>
    );
}
