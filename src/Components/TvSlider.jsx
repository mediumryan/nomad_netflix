import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useMatch, useNavigate } from 'react-router-dom';
import { getImages } from '../helper';
import TvBoxInfo from './TvBoxInfo';
// styled-components
import {
    SliderBox,
    Row,
    Box,
    SliderBtn,
    SelectedBox,
    SelectedLayout,
    CloseBtn,
    GoToDetail,
} from './MovieSlider';
// framer-motion variants
import { rowVariants, boxVariants } from './MovieSlider';

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
    const selectedMatch = useMatch(`/tv/:id`);
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
                                            navigate(`/tv/${item.id}`);
                                        }}
                                    >
                                        <TvBoxInfo item={item} />
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
                                        navigate('/tv');
                                    }}
                                >
                                    X
                                </CloseBtn>
                                <h2>{selectedItem.name}</h2>
                                <p>
                                    {selectedItem.overview
                                        ? selectedItem.overview
                                        : '개요 정보가 존재하지 않습니다.'}
                                </p>
                                <hr
                                    style={{
                                        marginTop: '24px',
                                        marginBottom: '24px',
                                    }}
                                />
                                <span>원제 : {selectedItem.original_name}</span>
                                <span>평점 : {selectedItem.vote_average}</span>
                                <span>
                                    청불 : {selectedItem.adult ? 'O' : 'X'}
                                </span>
                                <GoToDetail>영화 상세 페이지로 이동</GoToDetail>
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
    );
}
