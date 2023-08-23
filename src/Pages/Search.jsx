import { useQuery } from '@tanstack/react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { getSearch } from '../api';
import { styled } from 'styled-components';
import { Loader } from './Movie';
import SearchSelectedItem from '../Components/Search/SearchSelectedItem';
import { AnimatePresence } from 'framer-motion';
import { Box, boxVariants } from '../Components/Slider/SliderRow';
import BoxInfo from '../Components/Slider/BoxInfo';
import { getImages } from '../helper';

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

export default function Search() {
    const { query } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(['movies', 'searchData'], () => {
        return getSearch(query);
    });

    // modal setting
    const selectedMatch = useMatch(`/search/:query/:id`);

    const selectedItem =
        selectedMatch &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);

    return (
        <SearchWrapper>
            {isLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <SearchItems>
                    {data.results.map((item) => {
                        return (
                            <Box
                                layoutId={item.id + ''}
                                variants={boxVariants}
                                initial="initial"
                                whileHover="hover"
                                transition={{
                                    type: 'linear',
                                    delay: 0.3,
                                }}
                                key={item.id}
                                bg={getImages(
                                    item.poster_path
                                        ? item.poster_path
                                        : item.backdrop_path
                                )}
                                onClick={() => {
                                    navigate(`/search/${query}/${item.id}`);
                                }}
                            >
                                <BoxInfo
                                    item={item}
                                    mediaType={item.media_type}
                                />
                            </Box>
                        );
                    })}
                </SearchItems>
            )}

            <AnimatePresence>
                {selectedMatch && (
                    <SearchSelectedItem
                        selectedItem={selectedItem}
                        selectedMatch={selectedMatch}
                        query={query}
                    />
                )}
            </AnimatePresence>
        </SearchWrapper>
    );
}
