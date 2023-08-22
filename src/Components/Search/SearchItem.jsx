import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getImages } from '../../helper';
import BoxInfo from '../Slider/BoxInfo';

const SearchItemWrapper = styled(motion.div)`
    min-height: 320px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
`;

const SearchItemImg = styled.img`
    width: 100%;
    height: 100%;
`;

export const searchBoxVariants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        y: -50,
        zIndex: 2,
    },
};

export default function SearchItem({ item, query }) {
    const navigate = useNavigate();

    return (
        <SearchItemWrapper
            variants={searchBoxVariants}
            initial="initial"
            whileHover="hover"
            transition={{
                type: 'linear',
                delay: 0.3,
            }}
            key={item.id}
            onClick={() => {
                navigate(`/search/${query}/${item.id}`);
            }}
        >
            {item.poster_path || item.backdrop_path ? (
                <>
                    <SearchItemImg
                        src={getImages(item.poster_path)}
                        alt={
                            item.media_type === 'movie' ? item.title : item.name
                        }
                    />
                    <BoxInfo item={item} mediaType={item.media_type} />
                </>
            ) : (
                <p
                    style={{
                        fontSize: '24px',
                        textAlign: 'center  ',
                    }}
                >
                    Image not found
                </p>
            )}
        </SearchItemWrapper>
    );
}
