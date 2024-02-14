import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { detailIsStory } from '../../../atom';
import { HorizontalLine } from '../../../Pages/Detail';

export const OverviewWrapper = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 5rem 3rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
    h2 {
        font-size: 0.95rem;
        line-height: 1.5;
        text-align: center;
        text-shadow: #fc0 1px 0 10px;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
            font-size: 1.15rem;
        }
    }
    p {
        font-size: 0.85rem;
        line-height: 1.75;
        letter-spacing: 0.75px;
        max-height: 65%;
        overflow-y: scroll;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
            font-size: 1.15rem;
        }
    }
`;

export default function Overview({ data }) {
    const isStory = useRecoilValue(detailIsStory);

    return (
        <OverviewWrapper
            style={{
                display: isStory ? 'flex' : 'none',
            }}
        >
            <h2>"{data.tagline ? data.tagline : data.title}"</h2>
            <HorizontalLine />
            <p>
                {data.overview ? data.overview : 'Can not found Overview Data'}
            </p>
        </OverviewWrapper>
    );
}
