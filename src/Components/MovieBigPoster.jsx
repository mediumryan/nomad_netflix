import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import { GoToDetail } from './MovieSlider';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa';

export const BigPoster = styled(motion.div)`
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

export const BigTitle = styled.h2`
    padding-left: 20px;
    font-size: 48px;
    margin-bottom: 48px;
`;

export const BigStory = styled.p`
    padding-left: 20px;
    font-size: 18px;
    width: 50%;
    line-height: 1.5;
`;

export const BigBtnBox = styled.div`
    display: flex;
    align-items: center;
`;

export const BigGoToDetail = styled(GoToDetail)`
    margin: 24px 0 0 24px;
    width: 180px;
    transition: 300ms all;
    &:hover {
        opacity: 0.77;
    }
`;

export const BigPlayBtn = styled(BigGoToDetail)``;

export default function MovieBigPoster({ bigPosterValues }) {
    const navigate = useNavigate();

    return (
        <BigPoster bg_path={getImages(bigPosterValues.poster_path)}>
            <BigTitle>{bigPosterValues.title}</BigTitle>
            <BigStory>{bigPosterValues.overview}</BigStory>
            <BigBtnBox>
                <BigPlayBtn>
                    <FaPlayCircle />
                </BigPlayBtn>
                <BigGoToDetail
                    onClick={() => {
                        navigate(`/detail/${bigPosterValues.id}`);
                    }}
                >
                    <FaInfoCircle />
                </BigGoToDetail>
            </BigBtnBox>
        </BigPoster>
    );
}
