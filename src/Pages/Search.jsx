import { useQuery } from '@tanstack/react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
// import data
import { getSearch } from '../api';
// import components
import { Loader } from './Movie';
import SearchSelectedItem from '../Components/Search/SearchSelectedItem';
import SearchGrid from '../Components/Search/SearchGrid';

const SearchWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.black.darker};
    padding-top: 8.5rem;
`;

const SearchInner = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    padding: 2.5rem 5rem;
    width: 100%;
`;

const SearchResults = styled.h3`
    color: ${(props) => props.theme.red};
    font-size: 1.75rem;
    font-style: italic;
    font-weight: 700;
    text-align: center;
    margin-bottom: 5rem;
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

    const { data, isLoading } = useQuery(['search', 'search-data'], () => {
        return getSearch(query);
    });

    // modal setting
    const selectedMatch = useMatch(`/search/:query/:id`);

    const selectedItem =
        selectedMatch &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);

    // query값 변경시 페이지 다시 로딩
    useEffect(() => {}, [query]);

    console.log(data && data.results);

    return (
        <SearchWrapper>
            {isLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <SearchInner>
                    <SearchResults>
                        {query}(으)로 검색한 결과 입니다.
                    </SearchResults>
                    <SearchGrid data={data.results} />
                </SearchInner>
                // <SearchItems>
                //     {data.results.map((item) => {
                //         return (
                //             <Box
                //                 layoutId={item.id + ''}
                //                 // variants={boxVariants}
                //                 initial="initial"
                //                 whileHover="hover"
                //                 transition={{
                //                     type: 'linear',
                //                     delay: 0.3,
                //                 }}
                //                 key={item.id}
                //                 bg={getImages(
                //                     item.poster_path
                //                         ? item.poster_path
                //                         : item.backdrop_path
                //                 )}
                //                 onClick={() => {
                //                     navigate(`/detail/movie/${item.id}`);
                //                 }}
                //             >
                //                 {/* {boxIsLoading && (
                //                     <BoxImgLoader>'Loading...'</BoxImgLoader>
                //                 ) } */}
                //                 {/* <BoxImg
                //                     src={getImages(item.poster_path)}
                //                     onLoad={handleImageLoad}
                //                 /> */}
                //                 <BoxInfo
                //                     item={item}
                //                     mediaType={item.media_type}
                //                 />
                //             </Box>
                //         );
                //     })}
                // </SearchItems>
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
