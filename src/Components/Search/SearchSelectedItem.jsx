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
                    <h2>{selectedItem.title}</h2>
                    <p>{selectedItem.overview}</p>
                    <hr
                        style={{
                            marginTop: '24px',
                            marginBottom: '24px',
                        }}
                    />
                    <span>원제 : {selectedItem.original_title}</span>
                    <span>평점 : {selectedItem.vote_average}</span>
                    <span>청불 : {selectedItem.adult ? 'O' : 'X'}</span>
                    <GoToDetail
                        onClick={() => {
                            navigate(`/detail/${selectedItem.id}`);
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
