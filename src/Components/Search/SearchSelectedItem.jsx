import React from 'react';
import {
    CloseBtn,
    GoToDetail,
    SelectedBox,
    SelectedLayout,
} from '../Slider/Slider';
import { getImages } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

export default function SearchSelectedItem({
    selectedItem,
    selectedMatch,
    query,
}) {
    const navigate = useNavigate();

    return (
        <>
            {selectedItem && (
                <SelectedBox
                    layoutId={selectedMatch.params.id}
                    bg={getImages(selectedItem.poster_path, 'w500')}
                >
                    <CloseBtn
                        onClick={() => {
                            navigate(`/search/${query}`);
                        }}
                    >
                        X
                    </CloseBtn>
                    <h2>
                        {selectedItem.media_type === 'movie'
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
                    <span>
                        원제 :{' '}
                        {selectedItem.media_type === 'movie'
                            ? selectedItem.original_title
                            : selectedItem.original_name}
                    </span>
                    <span>평점 : {selectedItem.vote_average.toFixed(1)}</span>
                    <span>청불 : {selectedItem.adult ? 'O' : 'X'}</span>
                    <GoToDetail
                        onClick={() => {
                            selectedItem.media_type === 'movie'
                                ? navigate(`/movie/detail/${selectedItem.id}`)
                                : navigate(`/tv/detail/${selectedItem.id}`);
                        }}
                    >
                        <FaInfoCircle />
                        상세 페이지
                    </GoToDetail>
                </SelectedBox>
            )}
            <SelectedLayout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                    navigate(`/search/${query}`);
                }}
            />
        </>
    );
}
