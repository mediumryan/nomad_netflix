import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from '../api';
import { useQuery } from '@tanstack/react-query';

const TestWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ContentsWrapper = styled.div`
    background-color: grey;
    width: 100%;
`;

export default function Test() {
    const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useQuery(
        ['movies', 'nowPlaying'],
        getNowPlayingMovies
    );
    const { data: topRatedMovies, isLoading: topRatedLoading } = useQuery(
        ['movies', 'topRated'],
        getTopRatedMovies
    );
    const { data: popularMovies, isLoading: popularLoading } = useQuery(
        ['movies', 'popular'],
        getPopularMovies
    );

    const [movies] = useState([
        nowPlayingMovies.results,
        topRatedMovies.results,
        popularMovies.results,
    ]);

    return (
        <TestWrapper>
            {nowPlayingMovies || topRatedMovies || popularMovies ? (
                <ContentsWrapper>
                    {movies.map((i) => {
                        return (
                            <div>
                                <h2>Now Playing</h2>
                                {i?.map((item) => {
                                    return <div>{item.title}</div>;
                                })}
                            </div>
                        );
                    })}
                </ContentsWrapper>
            ) : null}
        </TestWrapper>
    );
}
