import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaInfoCircle } from 'react-icons/fa';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import MovieBoxInfo from './MovieBoxInfo';

// styled-components
export const SliderBox = styled(motion.div)`
    position: relative;
    top: -100px;
    margin-bottom: 330px;
    h2 {
        color: ${(props) => props.theme.white.darker};
        font-size: 36px;
        margin: 0 0 12px 12px;
        cursor: default;
    }
`;

export const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

export const Box = styled(motion.div)`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    min-height: 320px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

export const SliderBtn = styled(motion.button)`
    font-size: 36px;
    background: none;
    color: ${(props) => props.theme.red};
    transition: 300ms all;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;

export const SelectedBox = styled(motion.div)`
    width: 420px;
    height: 600px;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 48px;
    border-radius: 20px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5)),
        url(${(props) => props.bg});
    color: ${(props) => props.theme.white.lighter};
    z-index: 2;
    -webkit-box-shadow: 8px 8px 8px 4px #8ea292;
    box-shadow: 8px 8px 8px 4px #8ea292;
    h2 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 24px;
        text-align: center;
    }
    p {
        font-size: 20px;
    }
    span {
        display: block;
        margin-bottom: 24px;
        font-size: 20px;
    }
`;

export const CloseBtn = styled.button`
    font-size: 22px;
    padding: 8px;
    background: none;
    color: ${(props) => props.theme.white.lighter};
    position: absolute;
    top: 10px;
    right: 10px;
    transition: 300ms all linear;
    &:hover {
        color: ${(props) => props.theme.red};
    }
`;

export const GoToDetail = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-size: 22px;
    padding: 8px 0;
    margin: 0 auto;
    border-radius: 4px;
    color: ${(props) => props.theme.black.lighter};
    background-color: ${(props) => props.theme.white.darker};
    transition: 300ms all;
    &:hover {
        transform: scale(1.05);
    }
`;

export const SelectedLayout = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

// framer-motion variants
export const rowVariants = {
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

export const boxVariants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        zIndex: 2,
    },
};

export default function Slider({ data, sliderTitle }) {
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
    const selectedMatch = useMatch(`/movie/:id`);
    const selectedItem =
        selectedMatch?.params.id &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);

    return (
        <>
            <SliderBox>
                <h2>{sliderTitle}</h2>
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
                <AnimatePresence onExitComplete={toggleLeaving} custom={back}>
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
                            .map((item) => {
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
                                        bg={getImages(item.poster_path)}
                                        onClick={() => {
                                            navigate(`/movie/${item.id}`);
                                        }}
                                    >
                                        <MovieBoxInfo item={item} />
                                    </Box>
                                );
                            })}
                    </Row>
                </AnimatePresence>
            </SliderBox>
            <AnimatePresence>
                {selectedMatch ? (
                    <>
                        {selectedItem && (
                            <SelectedBox
                                layoutId={selectedMatch.params.id}
                                bg={getImages(selectedItem.poster_path, 'w500')}
                            >
                                <CloseBtn
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    X
                                </CloseBtn>
                                <h2>{selectedItem.title}</h2>
                                <p>{selectedItem.overview}</p>
                                <hr
                                    style={{
                                        marginTop: '24px',
                                        marginBottom: '24px',
                                    }}
                                />
                                <span>
                                    원제 : {selectedItem.original_title}
                                </span>
                                <span>평점 : {selectedItem.vote_average}</span>
                                <span>
                                    청불 : {selectedItem.adult ? 'O' : 'X'}
                                </span>
                                <GoToDetail
                                    onClick={() => {
                                        navigate(`/detail/${selectedItem.id}`);
                                    }}
                                >
                                    <FaInfoCircle />
                                    상세 페이지
                                </GoToDetail>
                            </SelectedBox>
                        )}
                        <SelectedLayout
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                navigate('/');
                            }}
                        />
                    </>
                ) : null}
            </AnimatePresence>
        </>
    );
}
