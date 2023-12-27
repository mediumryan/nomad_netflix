import { motion } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
// state
import { menuState } from '../../atom';

const HeaderItemsWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        display: ${(props) => (props.active ? 'flex' : 'none')};
        margin-top: 2rem;
    }
`;

const HeaderItem = styled(Link)`
    position: relative;
    font-size: 1.15rem;
    text-decoration: none;
    color: ${(props) => props.theme.white.lighter};
    margin: 0 0.5rem;
    padding: 0.25rem;
`;

const IsHere = styled(motion.div)`
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    width: 10px;
    height: 10px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: ${(props) => props.theme.red};
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        bottom: -15px;
    }
`;

export default function HeaderItems() {
    // 빨간 원 (isHere) 위치 조작을 위한 라우트 매칭
    const homeMatch = useMatch('/');
    const movieMatch = useMatch('/movie');
    const tvMatch = useMatch('/tv');
    // menu toggle
    const [menu, setMenu] = useRecoilState(menuState);
    const closeMenu = () => {
        setMenu((prev) => !prev);
    };

    return (
        <HeaderItemsWrapper active={menu}>
            <HeaderItem to="/" onClick={closeMenu}>
                Home
                {homeMatch && <IsHere layoutId="isHere" />}
            </HeaderItem>
            <HeaderItem to="/movie" onClick={closeMenu}>
                Movies
                {movieMatch && <IsHere layoutId="isHere" />}
            </HeaderItem>
            <HeaderItem to="tv" onClick={closeMenu}>
                Tv Shows
                {tvMatch && <IsHere layoutId="isHere" />}
            </HeaderItem>
        </HeaderItemsWrapper>
    );
}
