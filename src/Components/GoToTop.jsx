import { styled } from 'styled-components';
// import icons
import { FaArrowUp } from 'react-icons/fa';

const GoToTopWrapper = styled(FaArrowUp)`
    position: fixed;
    bottom: 10%;
    right: 5%;
    width: 20px;
    height: 20px;
    color: var(--white-100);
    transition: 300ms all;
    z-index: 3;
    cursor: pointer;
    svg {
        font-size: 1.15rem;
    }
    &:hover {
        color: var(--accent-red);
    }
`;

export default function GoToTop() {
    const goToTop = () => {
        window.scrollTo(0, 0);
    };

    return <GoToTopWrapper onClick={goToTop} />;
}
