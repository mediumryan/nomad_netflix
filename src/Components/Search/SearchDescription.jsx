import { styled } from 'styled-components';
// import genres
import { movieGenres, tvGenres } from '../../genres';
import { GoDetail } from '../Slider/SliderItem';
// import icons
import { FaInfoCircle } from 'react-icons/fa';

const SearchDescriptionWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.white.lighter};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    padding-top: 2.5rem;
`;

const SearchDescriptionTitle = styled.h4`
    cursor: default;
    text-shadow: #fc0 1px 0 10px;
    text-align: center;
`;

const SearchDescriptionGenres = styled.p`
    font-size: 0.85rem;
    color: ${(props) => props.theme.white.lighter};
    margin-top: 2.5rem;
`;

export default function SearchDescription({ data }) {
    // get genre data
    const genreNames =
        data.media_type === 'movie'
            ? data.genre_ids.map((id) => {
                  const genre = movieGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              })
            : data.media_type === 'tv' &&
              data.genre_ids.map((id) => {
                  const genre = tvGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              });

    return (
        <SearchDescriptionWrapper>
            <SearchDescriptionTitle>
                {data.media_type === 'movie'
                    ? data.title
                    : data.media_type === 'tv' && data.name}
                <span>({data.vote_average.toFixed(1)})</span>
            </SearchDescriptionTitle>
            <SearchDescriptionGenres>
                {genreNames
                    .slice(0, 3)
                    .filter((name) => name !== '')
                    .join(', ')}
            </SearchDescriptionGenres>
            <GoDetail
                style={{ bottom: '5rem' }}
                to={
                    data.media_type === 'movie'
                        ? `/detail/movie/${data.id}`
                        : data.media_type === 'tv' && `/detail/tv/${data.id}`
                }
            >
                <FaInfoCircle />
            </GoDetail>
        </SearchDescriptionWrapper>
    );
}
