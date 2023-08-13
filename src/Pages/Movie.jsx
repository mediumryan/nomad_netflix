import React from 'react';
import { styled } from 'styled-components';
import { getMovies } from '../api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getImages } from '../helper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${(props) => props.theme.white.darker};
`;

const BigTitle = styled.h2`
    padding-left: 20px;
    font-size: 48px;
    margin-bottom: 48px;
`;

const BigStory = styled.p`
    padding-left: 20px;
    font-size: 18px;
    width: 50%;
    line-height: 1.5;
`;

const Slider = styled(motion.div)`
    position: relative;
    top: -100px;
    h2 {
        color: ${(props) => props.theme.white.lighter};
        font-size: 24px;
        margin: 0 0 12px 12px;
    }
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)`
    background-color: ${(props) => props.theme.white.lighter};
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 18px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const SliderBtnBox = styled.div`
    position: absolute;
    width: 100%;
    top: 40%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SliderBtn = styled(motion.button)`
    font-size: 36px;
    background: none;
    color: ${(props) => props.theme.red};
`;

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
                    <BigPoster bg_path={getImages(data.results[0].poster_path)}>
                        <BigTitle>{data.results[0].title}</BigTitle>
                        <BigStory>{data.results[0].overview}</BigStory>
                    </BigPoster>
                    <Slider>
                        <h2>Popular Movies</h2>
                        <Row>
                            <SliderBtnBox>
                                <SliderBtn>
                                    <FaAngleLeft />
                                </SliderBtn>
                                <SliderBtn>
                                    <FaAngleRight />
                                </SliderBtn>
                            </SliderBtnBox>
                            {data.results
                                .slice(1)
                                .slice(0, 6)
                                .map((movie) => {
                                    return (
                                        <Box key={movie.id}>
                                            <img
                                                src={getImages(
                                                    movie.poster_path
                                                )}
                                                alt={movie.title}
                                            />
                                            <h4>{movie.title}</h4>
                                        </Box>
                                    );
                                })}
                        </Row>
                    </Slider>
                </>
            )}
        </MovieWrapper>
    );
}
