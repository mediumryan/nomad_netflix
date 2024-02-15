import { motion } from 'framer-motion';
import { styled } from 'styled-components';
// get images
import { getImages } from '../../helper';
import SearchDescription, {
    SearchDescriptionWrapper,
} from './SearchDescription';
// import components

const SearchItemWrapper = styled(motion.div)`
    height: 325px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover ${SearchDescriptionWrapper} {
        display: flex;
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 240px;
    }
`;

const SearchItemInner = styled.div`
    position: relative;
`;

const SearchItemImg = styled.img`
    width: 100%;
    height: 325px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 240px;
    }
`;

const NoVideo = styled.div`
    height: 325px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--black-200);
    border-radius: 10px;
    p {
        color: var(--white-200);
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        height: 240px;
    }
`;

export const searchBoxVariants = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        y: -50,
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
            }}
            key={data.id}
        >
            <SearchItemInner>
                {data.poster_path || data.backdrop_path ? (
                    <SearchItemImg
                        src={getImages(data.poster_path)}
                        alt={
                            data.media_type === 'movie'
                                ? data.title
                                : data.mediaType === 'tv' && data.name
                        }
                    />
                ) : (
                    <NoVideo>
                        <p>Image not found</p>
                    </NoVideo>
                )}

                <SearchDescription data={data} />
            </SearchItemInner>
        </SearchItemWrapper>
    );
}
