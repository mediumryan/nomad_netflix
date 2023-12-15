import { styled } from 'styled-components';
// import images
import { getImages } from '../../helper';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieVideos, getTvShowVideos } from '../../api';

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

const DescriptionButtons = styled.div`
    position: absolute;
    bottom: 15%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        color: ${(props) => props.theme.red};
        text-decoration: none;
        cursor: pointer;
        padding: 1rem;
        transition: 300ms all;
        &:hover {
            color: ${(props) => props.theme.white.lighter};
            transform: translateY(-10px);
        }
    }
`;

export default function SliderItem({ item, mediaType }) {
    const { data, loading } = useQuery(['video', 'video_data'], () => {
        return mediaType === 'movie'
            ? getMovieVideos(item.id)
            : getTvShowVideos(item.id);
    });

    return (
        <SliderItemWrapper>
            <img src={getImages(item.poster_path)} alt={item.title} />
            <SliderDescription>
                <DescriptionTitle>{item.title}</DescriptionTitle>
                <DescriptionButtons>
                    <a
                        href={
                            data && data.results !== []
                                ? `https://www.youtube.com/embed/${data.results[0].key}`
                                : '#'
                        }
                    >
                        Trailer
                    </a>
                    <Link>Detail</Link>
                </DescriptionButtons>
            </SliderDescription>
        </SliderItemWrapper>
    );
}
