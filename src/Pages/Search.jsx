import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getMovieSearch } from '../api';
import { styled } from 'styled-components';
import { Loader } from './Movie';
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
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
    justify-content: center;
    align-items: center;
`;

const SearchItem = styled.div`
    width: 250px;
    height: 280px;
    position: relative;
`;

const SearchItemImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

export default function Search() {
    const { query } = useParams();

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
                            <SearchItem>
                                {isLoading ? (
                                    'Image is Loading...'
                                ) : (
                                    <SearchItemImg
                                        src={getImages(item.poster_path)}
                                        alt={item.title}
                                    />
                                )}
                                <h2>{item.title}</h2>
                            </SearchItem>
                        );
                    })}
                </SearchItems>
            )}
        </SearchWrapper>
    );
}
