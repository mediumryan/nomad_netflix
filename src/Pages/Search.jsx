import { useQuery } from '@tanstack/react-query';
import { useMatch, useParams } from 'react-router-dom';
import { getSearch } from '../api';
import { styled } from 'styled-components';
import { Loader } from './Movie';
import SearchItem from '../Components/Search/SearchItem';
import SearchSelectedItem from '../Components/Search/SearchSelectedItem';
import { AnimatePresence } from 'framer-motion';

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

    const { data, isLoading } = useQuery(['movies', 'searchData'], () => {
        return getSearch(query);
    });

    // modal setting
    const selectedMatch = useMatch(`/search/:query/:id`);

    const selectedItem =
        selectedMatch &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);
    console.log(data);

    return (
        <SearchWrapper>
            {isLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <SearchItems>
                    {data.results.map((item) => {
                        return (
                            <SearchItem
                                key={item.id}
                                item={item}
                                query={query}
                            />
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
