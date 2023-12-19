import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTvShowCredits, getTvShowDetails, getTvShowVideos } from '../api';
import { styled } from 'styled-components';
import { getImages } from '../helper';
import { Loader } from './Movie';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {
    DetailDescription,
    DetailImg,
    DetailImgBox,
    DetailOverView,
    DetailWrapper,
    HorizontalLine,
    NoVideo,
    Star,
    Stars,
    VideoBox,
    VideoContents,
    VideoSliderBtn,
    VideoTitle,
    Videos,
} from './MovieDetail';

const TvLogoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TvLogo = styled.img`
    color: ${(props) => props.theme.black.lighter};
    width: 120px;
    height: 50px;
    margin-right: var(--margin-large);
    padding: var(--padding-small);
    border-radius: 8px;
    -webkit-box-shadow: 4px 4px 4px 2px #8ea292;
    box-shadow: 4px 4px 4px 2px #8ea292;
    background-color: ${(props) => props.theme.white.darker};
`;

export default function TvDetail() {
    const { id } = useParams();
    // 데이터 받아오기
    const { data: detailData, isLoading: detailIsLoading } = useQuery(
        ['tv', 'detailData'],
        () => {
            return getTvShowDetails(id);
        }
    );
    const { data: creditsData, isLoading: creditsIsLoading } = useQuery(
        ['tv', 'creditsData'],
        () => {
            return getTvShowCredits(id);
        }
    );
    const { data: videosData, isLoading: videosIsLoading } = useQuery(
        ['tv', 'videos'],
        () => {
            return getTvShowVideos(id);
        }
    );
    // 스토리 on/off
    const [onStory, setOnStory] = useState(false);
    const toggleStory = () => {
        setOnStory((prev) => !prev);
    };
    // 비디오 슬라이더
    const videoOffset = videosData?.results.length - 1;
    const [videoIndex, setVideoIndex] = useState(0);
    const goPrev = () => {
        setVideoIndex((prev) => (prev === 0 ? videoOffset : prev - 1));
    };
    const goNext = () => {
        setVideoIndex((prev) => (prev === videoOffset ? 0 : prev + 1));
    };

    console.log(detailData);

    return (
        <DetailWrapper>
            {detailIsLoading || creditsIsLoading || videosIsLoading ? (
                <Loader>'Loading...'</Loader>
            ) : (
                <>
                    <DetailImgBox>
                        <DetailImg
                            src={getImages(detailData.poster_path)}
                            alt={detailData.name}
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
                                    : detailData.name}
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
                        <h2>{detailData.name}</h2>
                        <HorizontalLine />
                        <p>원제 : {detailData.original_name}</p>
                        <p>
                            장르 :
                            {detailData.genres
                                .map((genre) => genre.name)
                                .join(', ')}
                        </p>
                        <p>
                            {detailData.release_date
                                ? `개봉일 : ${detailData.release_date}`
                                : null}
                        </p>
                        <p>
                            {detailData.episode_run_time.length > 0 &&
                                `런타임 : ${detailData.episode_run_time}분`}
                        </p>
                        <p style={{ lineHeight: '1.5' }}>
                            {creditsData.cast.length > 0 &&
                                `출연진 :
                            ${creditsData.cast
                                .slice(0, 4)
                                .map((cast) => cast.name)
                                .join(', ')}`}
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
                        <TvLogoWrapper>
                            {detailData.production_companies.length > 0 &&
                                detailData.production_companies[0].logo_path &&
                                detailData.production_companies
                                    .slice(0, 2)
                                    .map((company) => (
                                        <TvLogo
                                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                            key={company.id}
                                            alt={company.name}
                                        />
                                    ))}
                        </TvLogoWrapper>
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
