import { useQuery } from '@tanstack/react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { getSearch } from '../api';
import { styled } from 'styled-components';
import { Loader } from './Movie';
import SearchSelectedItem from '../Components/Search/SearchSelectedItem';
import { AnimatePresence, motion } from 'framer-motion';
import BoxInfo from '../Components/Slider/BoxInfo';
import { getImages } from '../helper';
import {
    BoxImg,
    BoxImgLoader,
    boxVariants,
} from '../Components/Slider/SliderRow';
import { useRecoilState } from 'recoil';
import { boxState } from '../atom';

const SearchWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: var(--padding-double-large);
`;

const SearchItems = styled.div`
    width: 100%;
    height: 100%;
    transform: translateY(10%);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: var(--margin-medium-large);
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        transform: translateY(5%);
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        transform: translateY(3%);
    }
`;

const Box = styled(motion.div)`
    min-height: 320px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        min-height: 200px;
        max-height: 200px;
    }
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

    const [boxIsLoading, setBoxIsLoading] = useRecoilState(boxState);
    const handleImageLoad = () => {
        setBoxIsLoading(false);
    };

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
                                {boxIsLoading ? (
                                    <BoxImgLoader>'Loading...'</BoxImgLoader>
                                ) : null}
                                <BoxImg
                                    src={getImages(item.poster_path)}
                                    onLoad={handleImageLoad}
                                />
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
