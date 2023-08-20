import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieSearch } from '../api';
import { styled } from 'styled-components';
import { Loader } from './Movie';
import { getImages } from '../helper';
import { motion } from 'framer-motion';
import MovieBoxInfo from './../Components/MovieBoxInfo';

const SearchWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 24px 48px;
`;

const SearchItems = styled.div`
    width: 100%;
    height: 100%;
    transform: translateY(15%);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 24px;
    justify-content: center;
    align-items: center;
`;

const SearchItem = styled(motion.div)`
    min-height: 320px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
`;

const SearchItemImg = styled.img`
    width: 100%;
    height: 100%;
`;

export const searchBoxVariants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        y: -50,
        zIndex: 2,
    },
};

export default function Search() {
    const { query } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(['movies', 'searchData'], () => {
        return getMovieSearch(query);
    });

    console.log(data?.results);

    return (
        <SearchWrapper>
            {isLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <SearchItems>
                    {data.results.map((item) => {
                        return (
                            <SearchItem
                                variants={searchBoxVariants}
                                initial="initial"
                                whileHover="hover"
                                transition={{
                                    type: 'linear',
                                    delay: 0.3,
                                }}
                                key={item.id}
                                onClick={() => {
                                    navigate(`/movie/${item.id}`);
                                }}
                            >
                                {item.poster_path || item.backdrop_path ? (
                                    <>
                                        <SearchItemImg
                                            src={getImages(item.poster_path)}
                                        />
                                        <MovieBoxInfo item={item} />
                                    </>
                                ) : (
                                    <p
                                        style={{
                                            fontSize: '24px',
                                            textAlign: 'center  ',
                                        }}
                                    >
                                        Image not found
                                    </p>
                                )}
                            </SearchItem>
                        );
                    })}
                </SearchItems>
            )}
        </SearchWrapper>
    );
}
