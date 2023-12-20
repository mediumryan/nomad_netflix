import { useRecoilValue } from 'recoil';
import { detailIsStory } from '../../../atom';
import { getImages } from '../../../helper';
import { styled } from 'styled-components';

export const PosterWrapper = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

export default function Poster({ data }) {
    const isStory = useRecoilValue(detailIsStory);

    return (
        <PosterWrapper
            src={getImages(data.poster_path)}
            alt={data.title}
            style={{
                display: isStory ? 'none' : 'block',
            }}
        />
    );
}
