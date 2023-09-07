import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, getMovieDetails, getMovieVideos } from '../api';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import { motion } from 'framer-motion';
import { Loader } from './Movie';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const DetailWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: var(--padding-double-large);
    div {
        margin: var(--margin-medium-large);
    }
    @media only screen and (max-width: 820px) {
        flex-direction: column;
        height: 100%;
    }
`;

export const DetailImgBox = styled(motion.div)`
    transform: translateY(10%);
    height: 80%;
    width: 33%;
    position: relative;
    button {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: var(--font-size-micro);
        padding: var(--padding-double-small);
        border-radius: 4px;
        background: none;
        background-color: ${(props) => props.theme.red};
        color: ${(props) => props.theme.white.lighter};
        z-index: 5;
    }
    @media only screen and (max-width: 820px) {
        width: 100%;
        height: 50vh;
    }
`;

export const DetailImg = styled(motion.img)`
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

export const DetailOverView = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: var(--padding-double-large);
    display: flex;
    flex-direction: column;
    z-index: 2;
    h2 {
        font-size: var(--font-size-medium);
        text-align: center;
    }
    p {
        font-size: var(--font-size-medium);
        line-height: 1.5;
        max-height: 65%;
        overflow-y: scroll;
    }
`;

export const HorizontalLine = styled.hr`
    margin: var(--margin-medium-large) 0;
    width: 100%;
`;

export const DetailDescription = styled.div`
    position: relative;
    transform: translateY(10%);
    height: 80%;
    width: 33%;
    padding: var(--padding-double-large);
    background-color: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.95));
    h2 {
        text-align: center;
        font-size: var(--font-size-medium-large);
        font-weight: 700;
        font-style: italic;
    }
    p {
        font-size: var(--font-size-small);
        margin-bottom: var(--margin-medium-large);
    }
    p.vote {
        display: flex;
        align-items: center;
    }
    @media only screen and (max-width: 820px) {
        width: 100%;
    }
`;

export const Stars = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
`;

export const Star = styled(motion.span)`
    width: 8px;
    height: 20px;
    margin-right: 2px;
    border-radius: 2px;
    background-color: ${(props) =>
        props.colored >= props.index + 1 ? 'yellow' : 'white'};
`;

export const VideoBox = styled.div`
    width: 33%;
    height: 80%;
    transform: translateY(10%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 820px) {
        width: 100%;
        height: 100vh;
    }
`;

export const NoVideo = styled.p`
    font-size: var(--font-size-medium);
`;

export const VideoContents = styled.div`
    width: 100%;
    height: 100%;
`;

export const VideoTitle = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-medium);
    h2 {
        text-align: center;
        font-weight: 700;
    }
`;

export const VideoSliderBtn = styled.button`
    background: none;
    color: ${(props) => props.theme.white.lighter};
    font-size: var(--font-size-medium);
    &:hover {
        color: ${(props) => props.theme.red};
    }
`;

export const Videos = styled.iframe`
    width: 100%;
    height: 85%;
    border-radius: 20px;
    text-align: center;
`;

export default function Detail() {
    const { id } = useParams();
    // 데이터 받아오기
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
    const { data: videosData, isLoading: videosIsLoading } = useQuery(
        ['movies', 'videos'],
        () => {
            return getMovieVideos(id);
        }
    );
    // 스토리 on/off
    const [onStory, setOnStory] = useState(false);
    const toggleStory = () => {
        setOnStory((prev) => !prev);
    };
    // 비디오 슬라이더
    const videoMaxPage = videosData?.results.length;
    const [videoIndex, setVideoIndex] = useState(0);
    const goPrev = () => {
        setVideoIndex((prev) => (prev === 0 ? videoMaxPage : prev - 1));
    };
    const goNext = () => {
        setVideoIndex((prev) => (prev === videoMaxPage ? 0 : prev + 1));
    };

    return (
        <DetailWrapper>
            {detailIsLoading || creditsIsLoading || videosIsLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <>
                    <DetailImgBox>
                        <DetailImg
                            src={getImages(detailData.poster_path)}
                            alt={detailData.title}
                            onStory={onStory}
                        />
                        <button onClick={toggleStory}>
                            {onStory ? '스토리 닫기' : '스토리 보기'}
                        </button>
                        <DetailOverView>
                            <h2>
                                "
                                {detailData.tagline
                                    ? detailData.tagline
                                    : detailData.title}
                                "
                            </h2>
                            <HorizontalLine />
                            <p>
                                {detailData.overview
                                    ? detailData.overview
                                    : 'Can not found Overview Data'}
                            </p>
                        </DetailOverView>
                    </DetailImgBox>
                    <DetailDescription>
                        <h2>{detailData.title}</h2>
                        <HorizontalLine />
                        <p>원제 : {detailData.original_title}</p>
                        <p>
                            장르 :
                            {detailData.genres
                                .map((genre) => genre.name)
                                .join(', ')}
                        </p>
                        <p>개봉일 : {detailData.release_date}</p>
                        <p>
                            런타임 : {Math.floor(detailData.runtime / 60)}
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
                    <VideoBox>
                        {videosData.results.length === 0 ? (
                            <NoVideo>
                                '동영상 샘플이 존재하지 않습니다.'
                            </NoVideo>
                        ) : (
                            <VideoContents>
                                <VideoTitle>
                                    <VideoSliderBtn onClick={goPrev}>
                                        <FaAngleLeft />
                                    </VideoSliderBtn>
                                    <h2>
                                        {videosData.results[videoIndex].name}
                                    </h2>
                                    <VideoSliderBtn onClick={goNext}>
                                        <FaAngleRight />
                                    </VideoSliderBtn>
                                </VideoTitle>
                                <Videos
                                    key={videosData.results[videoIndex].id}
                                    src={`https://www.youtube.com/embed/${videosData.results[videoIndex].key}`}
                                    title={videosData.results[videoIndex].key}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></Videos>
                            </VideoContents>
                        )}
                    </VideoBox>
                </>
            )}
        </DetailWrapper>
    );
}
