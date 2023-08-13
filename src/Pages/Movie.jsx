import React from 'react';
import { styled } from 'styled-components';
import { getMovies } from '../api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getImages } from '../helper';

const MovieWrapper = styled.div`
    height: 200vh;
`;

const Loader = styled.div`
    font-size: 48px;
    text-align: center;
`;

const BigPoster = styled(motion.div)`
    background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)),
        url(${(props) => props.bg_path});
    background-size: cover;
    background-position: center center;
    height: 100vh;
`;

const Slider = styled(motion.div)``;

export default function Movie() {
    // 영화 데이터 받아오기
    const { data, isLoading } = useQuery(['movies', 'nowPlaying'], () =>
        getMovies()
    );

    return (
        <MovieWrapper>
            {isLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster
                        bg_path={getImages(data.results[0].poster_path)}
                    ></BigPoster>
                    <Slider></Slider>
                </>
            )}
        </MovieWrapper>
    );
}
