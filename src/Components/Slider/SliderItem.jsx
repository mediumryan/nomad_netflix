import { styled } from 'styled-components';
// import images
import { getImages } from '../../helper';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { movieGenres, tvGenres } from '../../genres';

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
    transition: 150ms all;
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
    margin-bottom: 1rem;
    cursor: default;
    text-shadow: #fc0 1px 0 10px;
`;

const DescriptionGenres = styled.p`
    color: ${(props) => props.theme.white.darker};
    font-size: 0.85rem;
    cursor: default;
`;

const GoDetail = styled(Link)`
    position: absolute;
    color: ${(props) => props.theme.red};
    text-decoration: none;
    font-size: 1.25rem;
    bottom: 7.5%;
    padding: 1rem;
    transition: 300ms all;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
        transform: scale(1.15);
    }
`;

export default function SliderItem({ item, mediaType }) {
    const genreNames =
        mediaType === 'movie'
            ? item.genre_ids.map((id) => {
                  const genre = movieGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              })
            : item.genre_ids.map((id) => {
                  const genre = tvGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              });

    return (
        <SliderItemWrapper>
            <img src={getImages(item.poster_path)} alt={item.title} />
            <SliderDescription>
                <DescriptionTitle>
                    {mediaType === 'movie' ? item.title : item.name}
                    <span> ({item.vote_average.toFixed(1)})</span>
                </DescriptionTitle>
                <DescriptionGenres>
                    {genreNames
                        .filter((name) => name !== '')
                        .slice(0, 2)
                        .join(', ')}
                </DescriptionGenres>
                <GoDetail
                    to={
                        mediaType === 'movie'
                            ? `/movie/detail/${item.id}`
                            : `/tv/detail/${item.id}`
                    }
                >
                    <FaInfoCircle />
                </GoDetail>
            </SliderDescription>
        </SliderItemWrapper>
    );
}
