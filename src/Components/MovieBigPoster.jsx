import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { getImages } from '../helper';

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

export default function MovieBigPoster({ bigPosterValues }) {
    return (
        <BigPoster bg_path={getImages(bigPosterValues.poster_path)}>
            <BigTitle>{bigPosterValues.title}</BigTitle>
            <BigStory>{bigPosterValues.overview}</BigStory>
        </BigPoster>
    );
}
