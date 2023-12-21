import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
// icons
import { FaInfoCircle } from 'react-icons/fa';
// git images
import { getImages } from '../helper';
// get genres data
import { movieGenres, tvGenres } from '../genres';

const BigPosterContainer = styled(motion.div)`
    background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)),
        url(${(props) => props.bigPoster}) center;
    background-size: cover;
    color: ${(props) => props.theme.white.lighter};
    height: 120vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;

    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 100vh;
        justify-content: baseline;
    }
`;

const BigPosterInner = styled.div`
    position: relative;
    padding: 2rem 5rem;
    margin: 0 30% 0 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        padding: 1rem;
        margin: 50% 15% 0 2rem;
    }
`;

const BigTitle = styled.h2`
    font-size: 2.5rem;
    letter-spacing: 2px;
    text-shadow: #fc0 1px 0 10px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        line-height: 1.5;
    }
`;

const BigOriginalTitle = styled.h4`
    margin-top: 1rem;
    font-size: 1.5rem;
    letter-spacing: 1px;
    text-shadow: #ffe066 0.5px 0 5px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        line-height: 1.25;
    }
`;

const BigStory = styled.p`
    padding-left: var(--padding-medium-large);
    font-size: var(--font-size-small);
    width: 85%;
    letter-spacing: 2px;
    line-height: 1.5;
    margin: 2rem 0;
`;

const BigGenres = styled.p`
    font-size: 0.9rem;
    font-style: italic;
    color: ${(props) => props.theme.white.darker};
    margin: 2rem 0;
`;

const BigGoDetail = styled.div`
    padding: 1rem 2rem 1rem 0;
    font-size: 1.5rem;
    transition: 300ms all;
    display: flex;
    align-items: center;
    a {
        color: ${(props) => props.theme.red};
        margin: 0 1rem;
        transition: 300ms all;
        &:last-child {
            color: ${(props) => props.theme.white.lighter};
        }
        &:hover {
            color: ${(props) => props.theme.red};
            opacity: 0.75;
            transform: scale(1.15);
        }
    }
`;

const BigAdult = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${(props) => props.theme.red};
    border: 1px solid ${(props) => props.theme.red};
    font-size: 1.25rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function BigPoster({ bigPosterItem, mediaType }) {
    // get genre data
    const genreNames =
        mediaType === 'movie'
            ? bigPosterItem.genre_ids.map((id) => {
                  const genre = movieGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              })
            : bigPosterItem.genre_ids.map((id) => {
                  const genre = tvGenres.genres.find(
                      (genre) => genre.id === id
                  );
                  return genre ? genre.name : '';
              });

    return (
        <BigPosterContainer bigPoster={getImages(bigPosterItem.poster_path)}>
            <BigPosterInner>
                <BigTitle>
                    {mediaType === 'movie'
                        ? bigPosterItem.title
                        : bigPosterItem.name}
                    <span> ({bigPosterItem.vote_average.toFixed(1)})</span>
                </BigTitle>
                <BigOriginalTitle>
                    {mediaType === 'movie'
                        ? bigPosterItem.original_title
                        : bigPosterItem.original_name}
                </BigOriginalTitle>
                <BigStory>
                    {bigPosterItem.overview !== ''
                        ? bigPosterItem.overview
                        : 'The story data is not found'}
                </BigStory>

                <BigGenres>
                    {genreNames.filter((name) => name !== '').join(', ')}
                </BigGenres>
                <BigGoDetail>
                    <Link
                        to={
                            mediaType === 'movie'
                                ? `/detail/movie/${bigPosterItem.id}`
                                : `/detail/tv/${bigPosterItem.id}`
                        }
                    >
                        <FaInfoCircle />
                    </Link>
                </BigGoDetail>
                {bigPosterItem.adult && (
                    <BigAdult>
                        <span>18</span>
                    </BigAdult>
                )}
            </BigPosterInner>
        </BigPosterContainer>
    );
}
