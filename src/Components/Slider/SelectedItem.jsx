import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getImages } from '../../helper';
import { FaInfoCircle } from 'react-icons/fa';

export const SelectedBox = styled(motion.div)`
    width: 420px;
    height: 600px;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: var(--padding-very-large);
    border-radius: 20px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5)),
        url(${(props) => props.bg});
    color: ${(props) => props.theme.white.lighter};
    z-index: 2;
    -webkit-box-shadow: 8px 8px 8px 4px #8ea292;
    box-shadow: 8px 8px 8px 4px #8ea292;
    h2 {
        font-size: var(--font-size-medium-large);
        font-weight: 700;
        margin-bottom: var(--margin-medium-large);
        text-align: center;
    }
    p {
        font-size: var(--font-size-small);
        max-height: 30%;
        overflow-y: scroll;
    }
    span {
        display: block;
        margin-bottom: var(--margin-medium-large);
        font-size: var(--font-size-small);
    }
`;

export const CloseBtn = styled.button`
    font-size: var(--font-size-small);
    padding: var(--padding-small);
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
    font-size: var(--font-size-medium);
    padding: var(--padding-small) 0;
    margin: 0 auto;
    border-radius: 4px;
    color: ${(props) => props.theme.black.lighter};
    background-color: ${(props) => props.theme.white.darker};
    transition: 300ms all;
    &:hover {
        transform: scale(1.05);
        background-color: ${(props) => props.theme.white.lighter};
        color: ${(props) => props.theme.black.darker};
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

export default function SelectedItem({
    sliderTitle,
    selectedMatch,
    data,
    mediaType,
}) {
    const navigate = useNavigate();

    const selectedItem =
        selectedMatch?.params.id &&
        data?.results.find((a) => a.id + '' === selectedMatch?.params.id);

    return (
        <>
            {selectedItem && (
                <SelectedBox
                    layoutId={sliderTitle + selectedMatch.params.id}
                    bg={getImages(selectedItem.poster_path, 'w500')}
                >
                    <CloseBtn
                        onClick={() => {
                            mediaType === 'movie'
                                ? navigate('/')
                                : navigate('/tv');
                        }}
                    >
                        X
                    </CloseBtn>
                    <h2>
                        {mediaType === 'movie'
                            ? selectedItem.title
                            : selectedItem.name}
                    </h2>
                    <p>{selectedItem.overview}</p>
                    <hr
                        style={{
                            marginTop: '24px',
                            marginBottom: '24px',
                        }}
                    />
                    <span style={{ lineHeight: '1.5' }}>
                        원제 :{' '}
                        {mediaType === 'movie'
                            ? selectedItem.original_title
                            : selectedItem.original_name}
                    </span>
                    <span>평점 : {selectedItem.vote_average}</span>
                    <span>청불 : {selectedItem.adult ? 'O' : 'X'}</span>
                    <GoToDetail
                        onClick={() => {
                            mediaType === 'movie'
                                ? navigate(`/movie/detail/${selectedItem.id}`)
                                : navigate(`/tv/detail/${selectedItem.id}`);
                        }}
                    >
                        <FaInfoCircle style={{ marginRight: '8px' }} />
                        상세 페이지
                    </GoToDetail>
                </SelectedBox>
            )}
            <SelectedLayout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                    mediaType === 'movie' ? navigate('/') : navigate('/tv');
                }}
            />
        </>
    );
}
