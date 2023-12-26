import { motion } from 'framer-motion';
import { styled } from 'styled-components';
// get images
import { getImages } from '../../helper';
import SearchDescription, {
    SearchDescriptionWrapper,
} from './SearchDescription';
// import components

const SearchItemWrapper = styled(motion.div)`
    min-height: 320px;
    max-height: 320px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover ${SearchDescriptionWrapper} {
        display: flex;
    }
`;

const SearchItemInner = styled.div`
    position: relative;
`;

const SearchItemImg = styled.img`
    width: 100%;
    height: 320px;
`;

const NoVideo = styled.div`
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.black.lighter};
    border-radius: 10px;
    p {
        color: ${(props) => props.theme.white.darker};
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
