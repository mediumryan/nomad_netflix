import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa';

export const BigPosterContainer = styled(motion.div)`
    background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)),
        url(${(props) => props.bg_path});
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${(props) => props.theme.white.darker};
`;

export const BigTitle = styled.h2`
    padding-left: var(--padding-medium-large);
    font-size: var(--font-size-large);
    margin-bottom: var(--margin-very-large);
`;

export const BigStory = styled.p`
    padding-left: var(--padding-medium-large);
    font-size: var(--font-size-small);
    width: 50%;
    line-height: 1.5;
`;

export const BigBtnBox = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 50%;
    }
`;

export default function BigPoster({ bigPosterValues, mediaType }) {
    const navigate = useNavigate();

    return (
        <BigPosterContainer bg_path={getImages(bigPosterValues.poster_path)}>
            <BigTitle>
                {mediaType === 'movie'
                    ? bigPosterValues.title
                    : bigPosterValues.name}
            </BigTitle>
            <BigStory>
                {bigPosterValues.overview !== ''
                    ? bigPosterValues.overview
                    : 'Overview not found'}
            </BigStory>
        </BigPosterContainer>
    );
}
