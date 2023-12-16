import { styled } from 'styled-components';
// import images
import { getImages } from '../../helper';
import { Link } from 'react-router-dom';

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

const SliderItemWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-height: 325px;
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
    font-size: 1.5rem;
    text-align: center;
    cursor: default;
`;

const GoDetail = styled(Link)`
    position: absolute;
    color: red;
    text-decoration: none;
    bottom: 7.5%;
    padding: 1rem 2rem;
    transition: 300ms all;
    &:hover {
        opacity: 0.75;
        transform: scale(1.15);
    }
`;

export default function SliderItem({ item, mediaType }) {
    return (
        <SliderItemWrapper>
            <img src={getImages(item.poster_path)} alt={item.title} />
            <SliderDescription>
                <DescriptionTitle>{item.title}</DescriptionTitle>
                <GoDetail
                    to={
                        mediaType === 'movie'
                            ? `/movie/detail/${item.id}`
                            : `/tv/detail/${item.id}`
                    }
                >
                    Go Detail / Trailer
                </GoDetail>
            </SliderDescription>
        </SliderItemWrapper>
    );
}
