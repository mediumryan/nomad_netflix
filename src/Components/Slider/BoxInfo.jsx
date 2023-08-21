import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import {
    FaAngleDown,
    FaPlay,
    FaPlus,
    FaThumbsDown,
    FaThumbsUp,
} from 'react-icons/fa';

export const Info = styled(motion.div)`
    background-color: ${(props) => props.theme.black.lighter};
    color: ${(props) => props.theme.white.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 24px;
    h4 {
        margin: 12px 0;
    }
`;

export const InfoBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 12px 0;
`;

export const InfoBtnLeft = styled.div``;

export const InfoBtn = styled.button`
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 4px;
    margin: 4px;
    color: ${(props) => props.theme.white.lighter};
    background: none;
    border: 1px solid ${(props) => props.theme.white.lighter};
    transition: 300ms all;
    &:first-child {
        background-color: ${(props) => props.theme.white.lighter};
        color: ${(props) => props.theme.black.darker};
        &:hover {
            color: ${(props) => props.theme.red};
        }
    }
    &:hover {
        transform: scale(1.15);
        background-color: ${(props) => props.theme.white.lighter};
        color: ${(props) => props.theme.black.darker};
    }
`;

export const infoVariants = {
    initial: {
        opacity: 0,
    },
    hover: {
        opacity: 1,
    },
};

export default function BoxInfo({ item }) {
    return (
        <Info variants={infoVariants}>
            <h4>{item.title}</h4>
            <InfoBtnBox>
                <InfoBtnLeft>
                    <InfoBtn>
                        <FaPlay />
                    </InfoBtn>
                    <InfoBtn>
                        <FaPlus />
                    </InfoBtn>
                    <InfoBtn>
                        <FaThumbsUp />
                    </InfoBtn>
                    <InfoBtn>
                        <FaThumbsDown />
                    </InfoBtn>
                </InfoBtnLeft>
                <InfoBtn>
                    <FaAngleDown />
                </InfoBtn>
            </InfoBtnBox>
        </Info>
    );
}
