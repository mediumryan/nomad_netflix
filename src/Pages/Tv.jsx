import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getTvShows } from '../api';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { getImages } from '../helper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useMatch, useNavigate } from 'react-router-dom';

const TvWrapper = styled.div`
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
    height: 320px;
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

const TvCover = styled(motion.div)`
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.white.lighter};
    opacity: 0;
    padding: 20px;
`;

const SelectedBox = styled(motion.div)`
    width: 420px;
    height: 600px;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 48px;
    border-radius: 20px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25)),
        url(${(props) => props.bg});
    color: ${(props) => props.theme.white.lighter};
    z-index: 2;
    -webkit-box-shadow: 13px 15px 15px 4px #c1f9cc;
    box-shadow: 13px 15px 15px 4px #c1f9cc;
    h2 {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 24px;
        text-align: center;
    }
    p {
        font-size: 20px;
    }
`;

const SelectedLayout = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
    },
};

const tvCoverVariants = {
    initial: {
        opacity: 0,
    },
    hover: {
        opacity: 1,
    },
};

export default function Tv() {
    // 영화 데이터 받아오기
    const { data, isLoading } = useQuery(['tv', 'popular'], () => getTvShows());

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

    // 슬라이더 모달
    const navigate = useNavigate();
    const selectedMatch = useMatch('/tv/:id');
    const selectedTv =
        selectedMatch?.params.id &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);

    return (
        <TvWrapper>
            {isLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <BigPoster bg_path={getImages(data.results[0].poster_path)}>
                        <BigTitle>{data.results[0].name}</BigTitle>
                        <BigStory>{data.results[0].overview}</BigStory>
                    </BigPoster>
                    <Slider>
                        <h2>Popular Shows</h2>
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
                                    .map((tv) => {
                                        return (
                                            <Box
                                                layoutId={tv.id + ''}
                                                variants={boxVariants}
                                                initial="initial"
                                                whileHover="hover"
                                                transition={{
                                                    type: 'linear',
                                                    delay: 0.3,
                                                }}
                                                key={tv.id}
                                                bg={getImages(tv.poster_path)}
                                                onClick={() => {
                                                    navigate(`/tv/${tv.id}`);
                                                }}
                                            >
                                                <TvCover
                                                    variants={tvCoverVariants}
                                                >
                                                    <h4>{tv.name}</h4>
                                                </TvCover>
                                            </Box>
                                        );
                                    })}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {selectedMatch ? (
                            <>
                                {selectedTv && (
                                    <SelectedBox
                                        layoutId={selectedMatch.params.id}
                                        bg={getImages(
                                            selectedTv.poster_path,
                                            'w500'
                                        )}
                                    >
                                        <h2>{selectedTv.name}</h2>
                                        <p>{selectedTv.overview}</p>
                                    </SelectedBox>
                                )}
                                <SelectedLayout
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => {
                                        navigate('/tv');
                                    }}
                                />
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </TvWrapper>
    );
}
