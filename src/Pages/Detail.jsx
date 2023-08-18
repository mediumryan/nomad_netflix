import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, getMovieDetails } from '../api';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import { motion } from 'framer-motion';
import { Loader } from './Movie';

const DetailWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 24px 48px;
    div {
        margin: 24px;
    }
`;

const DetailImgBox = styled(motion.div)`
    transform: translateY(10%);
    height: 80%;
    width: 50%;
    position: relative;
`;

const DetailImg = styled(motion.img)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${(props) => (props.onStory ? 1 : 3)};
    opacity: ${(props) => (props.onStory ? 0 : 1)};
    border-radius: 20px;
    transition: 700ms all;
`;

const DetailOverView = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 24px 48px;
    display: flex;
    flex-direction: column;
    z-index: 2;
    h2 {
        font-size: 28px;
        text-align: center;
    }
    p {
        font-size: 24px;
        line-height: 1.5;
        max-height: 65%;
        overflow-y: scroll;
    }
`;

const DetailDescription = styled.div`
    position: relative;
    transform: translateY(10%);
    height: 80%;
    width: 50%;
    padding: 24px 48px;
    background-color: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.95));
    h2 {
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        font-style: italic;
    }
    p {
        font-size: 20px;
        margin-bottom: 24px;
    }
    p.vote {
        display: flex;
        align-items: center;
    }
    button {
        position: absolute;
        top: 10px;
        left: 50px;
        font-size: 18px;
        padding: 8px 12px;
        border-radius: 4px;
        background: none;
        border: 2px solid ${(props) => props.theme.white.lighter};
        color: ${(props) => props.theme.white.lighter};
        transition: 300ms all;
        &:hover {
            border: 2px solid ${(props) => props.theme.red};
            color: ${(props) => props.theme.red};
        }
    }
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
`;

const Star = styled(motion.span)`
    width: 8px;
    height: 20px;
    margin-right: 2px;
    border-radius: 2px;
    background-color: ${(props) =>
        props.colored >= props.index + 1 ? 'yellow' : 'white'};
`;

export default function Detail() {
    const { id } = useParams();
    // 디테일 데이터 받아오기
    const { data: detailData, isLoading: detailIsLoading } = useQuery(
        ['movies', 'detailData'],
        () => {
            return getMovieDetails(id);
        }
    );
    const { data: creditsData, isLoading: creditsIsLoading } = useQuery(
        ['movies', 'creditsData'],
        () => {
            return getMovieCredits(id);
        }
    );
    // 스토리 on/off
    const [onStory, setOnStory] = useState(false);
    const toggleStory = () => {
        setOnStory((prev) => !prev);
    };

    console.log(detailData);

    return (
        <DetailWrapper>
            {detailIsLoading || creditsIsLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <>
                    <DetailImgBox>
                        <DetailImg
                            src={getImages(detailData.poster_path)}
                            alt={detailData.title}
                            onStory={onStory}
                        />
                        <DetailOverView>
                            <h2>"{detailData.tagline}"</h2>
                            <hr
                                style={{
                                    marginTop: '24px',
                                    marginBottom: '24px',
                                    width: '100%',
                                }}
                            />
                            <p>{detailData.overview}</p>
                        </DetailOverView>
                    </DetailImgBox>
                    <DetailDescription>
                        <h2>{detailData.title}</h2>
                        <button onClick={toggleStory}>
                            {onStory ? '스토리 닫기' : '스토리 보기'}
                        </button>
                        <hr
                            style={{
                                marginTop: '24px',
                                marginBottom: '24px',
                            }}
                        />
                        <p>원제 : {detailData.original_title}</p>
                        <p>
                            장르 :
                            {detailData.genres
                                .map((genre) => genre.name)
                                .join(', ')}
                        </p>
                        <p>개봉일 : {detailData.release_date}</p>
                        <p>
                            상영시간 : {Math.floor(detailData.runtime / 60)}
                            시간
                            {Math.floor(detailData.runtime % 60)}분
                        </p>
                        <p style={{ lineHeight: '1.5' }}>
                            출연진 :{' '}
                            {creditsData.cast
                                .slice(0, 4)
                                .map((cast) => cast.name)
                                .join(', ')}
                        </p>
                        <p className="vote">
                            평점 : {detailData.vote_average.toFixed(1)}
                            <Stars>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                                    (star, index) => {
                                        return (
                                            <Star
                                                key={index}
                                                index={index}
                                                colored={detailData.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                        );
                                    }
                                )}
                            </Stars>
                        </p>
                    </DetailDescription>
                </>
            )}
        </DetailWrapper>
    );
}
