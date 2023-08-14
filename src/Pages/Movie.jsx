import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getMovies } from '../api';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
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
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    height: 200px;
    padding-bottom: 200px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const SliderBtn = styled(motion.button)`
    font-size: 36px;
    background: none;
    color: ${(props) => props.theme.red};
    transition: 300ms all;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;

const rowVariants = {
    initial: (back) => {
        return {
            x: back ? window.outerWidth : -window.outerWidth,
        };
    },
    slide: {
        x: 0,
    },

    exit: (back) => {
        return {
            x: !back ? window.outerWidth : -window.outerWidth,
        };
    },
};

const boxVariants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        zIndex: 999,
    },
};

export default function Movie() {
    // 영화 데이터 받아오기
    const { data, isLoading } = useQuery(['movies', 'nowPlaying'], () =>
        getMovies()
    );

    // 슬라이더
    const offset = 6;
    const maxPage = Math.floor(data?.results.length / offset) - 1;
    const [sliderPage, setSliderPage] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const goNext = () => {
        if (leaving) {
            return;
        }
        toggleLeaving();
        setSliderPage((prev) => (prev === maxPage ? 0 : prev + 1));
    };
    const goPrev = () => {
        if (leaving) {
            return;
        }
        toggleLeaving();
        setSliderPage((prev) => (prev === 0 ? maxPage : prev - 1));
    };
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

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
                        <SliderBtn>
                            <FaAngleLeft
                                onClick={() => {
                                    goPrev();
                                    setBack(true);
                                }}
                            />
                        </SliderBtn>
                        <SliderBtn>
                            <FaAngleRight
                                onClick={() => {
                                    goNext();
                                    setBack(false);
                                }}
                            />
                        </SliderBtn>

                        <AnimatePresence
                            onExitComplete={toggleLeaving}
                            custom={back}
                        >
                            <Row
                                custom={back}
                                variants={rowVariants}
                                initial="initial"
                                animate="slide"
                                exit="exit"
                                transition={{
                                    duration: 1,
                                }}
                                key={sliderPage}
                            >
                                {data.results
                                    .slice(1)
                                    .slice(
                                        sliderPage * offset,
                                        (sliderPage + 1) * offset
                                    )
                                    .map((movie) => {
                                        return (
                                            <Box
                                                variants={boxVariants}
                                                initial="initial"
                                                whileHover="hover"
                                                transition={{
                                                    type: 'linear',
                                                }}
                                                key={movie.id}
                                                bg={getImages(
                                                    movie.poster_path
                                                )}
                                            >
                                                <h4>{movie.title}</h4>
                                            </Box>
                                        );
                                    })}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </MovieWrapper>
    );
}
