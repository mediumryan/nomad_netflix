import React from 'react';
import { styled } from 'styled-components';

const NFWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: var(--white-100);
`;

export default function NotFound() {
    return (
        <NFWrapper>
            Sorry, <br />
            Page is Not Found
        </NFWrapper>
    );
}
