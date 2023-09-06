import { motion } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { styled } from 'styled-components';

export const SliderBtn = styled(motion.button)`
    font-size: var(--font-size-medium-large);
    background: none;
    color: ${(props) => props.theme.red};
    transition: 300ms all;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;

export default function SliderBtns({ goPrev, goNext, setBack, leaving }) {
    return (
        <>
            <SliderBtn>
                <FaAngleLeft
                    onClick={() => {
                        if (leaving) {
                            return;
                        }
                        goPrev();
                        setBack(true);
                    }}
                />
            </SliderBtn>
            <SliderBtn>
                <FaAngleRight
                    onClick={() => {
                        if (leaving) {
                            return;
                        }
                        goNext();
                        setBack(false);
                    }}
                />
            </SliderBtn>
        </>
    );
}
