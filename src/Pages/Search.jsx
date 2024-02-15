import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect } from 'react';
// import data
import { getSearch } from '../api';
// import components
import { Loader } from './Movie';
import SearchGrid from '../Components/Search/SearchGrid';

const SearchWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--black-100);
    padding: 8.5rem 0 5rem 0;
`;

const SearchInner = styled.div`
    padding: 2.5rem 5rem;
    width: 100%;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        padding: 2.5rem;
    }
`;

const SearchResults = styled.h3`
    color: var(--accent-red);
    font-size: 1.75rem;
    font-style: italic;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 2px;
    text-align: center;
    margin-bottom: 5rem;
`;

export default function Search() {
    const { query } = useParams();

    const { data, isLoading, refetch } = useQuery(
        ['search', 'search-data'],
        () => {
            return getSearch(query);
        }
    );

    // query값 변경시 페이지 다시 로딩
    useEffect(() => {
        refetch();
    }, [query, refetch]);

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
            )}
        </SearchWrapper>
    );
}
