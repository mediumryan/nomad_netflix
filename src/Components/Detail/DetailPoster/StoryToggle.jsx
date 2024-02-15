import React from 'react';
import { useRecoilState } from 'recoil';
import { detailIsStory } from '../../../atom';
import { styled } from 'styled-components';

export const DetailToggleButton = styled.button`
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    background: none;
    background-color: var(--accent-red);
    color: var(--white-100);
    z-index: 3;
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
