import React from 'react';
import { useRecoilState } from 'recoil';
import { detailIsStory } from '../../../atom';
import { styled } from 'styled-components';

export const DetailToggleButton = styled.button`
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: var(--font-size-micro);
    padding: 4px 8px;
    border-radius: 4px;
    background: none;
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white.lighter};
    z-index: 5;
`;

export default function StoryToggle({ mediaType }) {
    const [isStory, setIsStory] = useRecoilState(detailIsStory);

    return (
        <DetailToggleButton
            style={{ display: mediaType === 'tv' ? 'none' : 'block' }}
            onClick={() => {
                setIsStory((prev) => {
                    return !prev;
                });
            }}
        >
            {isStory ? '스토리 닫기' : '스토리 보기'}
        </DetailToggleButton>
    );
}
