import { AnimatePresence, motion } from 'framer-motion';
import { styled } from 'styled-components';
import { getImages } from '../../helper';
import { useNavigate } from 'react-router-dom';
import BoxInfo from './BoxInfo';
import { useRecoilValue } from 'recoil';
import { offsetState } from '../../atom';
import { useState } from 'react';

export const Row = styled(motion.div)`
    display: grid;
    gap: var(--margin-micro);
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const Box = styled(motion.div)`
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

export const BoxImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`;

export const BoxImgLoader = styled.div`
    color: ${(props) => props.theme.white.darker};
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

export default function SliderRow({
    sliderTitle,
    back,
    sliderPage,
    data,
    mediaType,
    setLeaving,
}) {
    const navigate = useNavigate();
    const offset = useRecoilValue(offsetState);

    const [boxIsLoading, setBoxIsLoading] = useState(true);
    const handleImageLoad = () => {
        setBoxIsLoading(false);
    };

    return (
        <AnimatePresence
            onExitComplete={() => setTimeout(setLeaving(false), 100)}
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
                    .slice(sliderPage * offset, (sliderPage + 1) * offset)
                    .map((item) => {
                        return (
                            <Box
                                layoutId={sliderTitle + item.id}
                                variants={boxVariants}
                                initial="initial"
                                whileHover="hover"
                                transition={{
                                    type: 'linear',
                                    delay: 0.3,
                                }}
                                key={item.id}
                                onClick={() => {
                                    navigate(`/${mediaType}/${item.id}`);
                                }}
                            >
                                {boxIsLoading ? (
                                    <BoxImgLoader>'Loading...'</BoxImgLoader>
                                ) : null}
                                <BoxImg
                                    src={getImages(item.poster_path)}
                                    onLoad={handleImageLoad}
                                />
                                <BoxInfo item={item} mediaType={mediaType} />
                            </Box>
                        );
                    })}
            </Row>
        </AnimatePresence>
    );
}
