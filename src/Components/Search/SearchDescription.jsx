import { styled } from 'styled-components';
// import genres
import { movieGenres, tvGenres } from '../../genres';
// import icons
import { FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SearchDescriptionWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.white.lighter};
    display: none;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    padding-top: 2.5rem;
    cursor: default;
`;

const SearchDescriptionTitle = styled.h4`
    height: 25%;
    text-shadow: #fc0 1px 0 10px;
    text-align: center;
    line-height: 1.15;
    padding: 0 1rem;
    overflow: hidden;
`;

const SearchDescriptionGenres = styled.p`
    height: 25%;
    font-size: 0.85rem;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.theme.white.lighter};
    margin-top: 2.5rem;
    padding: 0 1rem;
`;

const SearchGoDetail = styled(Link)`
    height: 50%;
    color: ${(props) => props.theme.white.lighter};
    text-decoration: none;
    font-size: 1.25rem;
    padding: 1rem;
    transition: 300ms all;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.red};
        transform: scale(1.15);
    }
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
                <span>({data.vote_average})</span>
            </SearchDescriptionTitle>
            <SearchDescriptionGenres
                style={{ display: data.genre_ids ? 'block' : 'none' }}
            >
                {data.genre_ids
                    ? genreNames
                          .slice(0, 3)
                          .filter((name) => name !== '')
                          .join(', ')
                    : null}
            </SearchDescriptionGenres>
            <SearchGoDetail
                to={
                    data.media_type === 'movie'
                        ? `/detail/movie/${data.id}`
                        : data.media_type === 'tv' && `/detail/tv/${data.id}`
                }
            >
                <FaInfoCircle />
            </SearchGoDetail>
        </SearchDescriptionWrapper>
    );
}
