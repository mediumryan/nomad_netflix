import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { styled } from 'styled-components';
import SliderRow from './SliderRow';
import SelectedItem from './SelectedItem';
import SliderBtns from './SliderBtns';
import { useRecoilValue } from 'recoil';
import { offsetState } from '../../atom';

// styled-components
export const SliderBox = styled(motion.div)`
    position: relative;
    top: -100px;
    margin-bottom: 330px;
    h2 {
        color: ${(props) => props.theme.white.darker};
        font-size: var(--font-size-medium-large);
        margin: 0 0 var(--margin-medium) var(--margin-medium);
        cursor: default;
    }
`;

export default function Slider({ data, sliderTitle, mediaType }) {
    // 슬라이더
    const offset = useRecoilValue(offsetState);
    const maxPage = Math.floor(data?.results.length / offset) - 1;
    const [sliderPage, setSliderPage] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const goNext = () => {
        if (leaving) {
            return;
        }
        setLeaving(true);
        setSliderPage((prev) => (prev === maxPage ? 0 : prev + 1));
    };
    const goPrev = () => {
        if (leaving) {
            return;
        }
        setLeaving(true);
        setSliderPage((prev) => (prev === 0 ? maxPage : prev - 1));
    };

    // 슬라이더 모달
    const selectedMatch = useMatch(`/${mediaType}/:id`);

    return (
        <>
            <SliderBox>
                <h2>{sliderTitle}</h2>
                <SliderBtns
                    goPrev={goPrev}
                    goNext={goNext}
                    setBack={setBack}
                    leaving={leaving}
                />
                <SliderRow
                    sliderTitle={sliderTitle}
                    back={back}
                    sliderPage={sliderPage}
                    data={data}
                    offset={offset}
                    mediaType={mediaType}
                    setLeaving={setLeaving}
                />
            </SliderBox>
            <AnimatePresence>
                {selectedMatch ? (
                    <SelectedItem
                        sliderTitle={sliderTitle}
                        selectedMatch={selectedMatch}
                        data={data}
                        mediaType={mediaType}
                    />
                ) : null}
            </AnimatePresence>
        </>
    );
}
