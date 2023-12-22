import { motion } from 'framer-motion';
import { styled } from 'styled-components';
// get images
import { getImages } from '../../helper';
import SearchDescription from './SearchDescription';
// import components

const SearchItemWrapper = styled(motion.div)`
    min-height: 320px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
`;

const SearchItemInner = styled.div`
    position: relative;
`;

const SearchItemImg = styled.img`
    width: 100%;
    height: 100%;
`;

const NoImage = styled.p`
    font-size: 1.25rem;
    text-align: center;
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

export default function SearchItem({ data }) {
    return (
        <SearchItemWrapper
            variants={searchBoxVariants}
            initial="initial"
            whileHover="hover"
            transition={{
                type: 'linear',
                delay: 0.3,
            }}
            key={data.id}
            onClick={() => {}}
        >
            {data.poster_path || data.backdrop_path ? (
                <SearchItemInner>
                    <SearchItemImg
                        src={getImages(data.poster_path)}
                        alt={
                            data.media_type === 'movie'
                                ? data.title
                                : data.mediaType === 'tv' && data.name
                        }
                    />
                    <SearchDescription data={data} />
                </SearchItemInner>
            ) : (
                <NoImage>Image not found</NoImage>
            )}
        </SearchItemWrapper>
    );
}
