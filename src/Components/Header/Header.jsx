import {
    motion,
    useScroll,
    useMotionValueEvent,
    useAnimation,
} from 'framer-motion';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// components
import HeaderSearch from './HeaderSearch';
import HeaderItems from './HeaderItems';
// icons
import { FaBackward, FaBars } from 'react-icons/fa';
// state
import { menuState } from '../../atom';

const HeaderWrapper = styled(motion.nav)`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.15rem;
    padding: 1.5rem 3rem;
    color: white;
    z-index: 2;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
    }
`;

const HeaderContents = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
    }
`;

const Ryan = styled.button`
    margin-right: 2rem;
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 700;
    letter-spacing: -2.5px;
    background: #61398f;
    background: linear-gradient(to right, #ff983f 0%, #61398f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: rotate(1.5deg);
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        margin: 0;
    }
`;

const GoBackBtn = styled(motion.button)`
    display: none;
    font-size: 1.15rem;
    color: ${(props) => props.theme.red};
    position: absolute;
    top: 80px;
    left: 80px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        display: block;
        top: 20px;
        left: 40px;
    }
`;

const MenuToggleBtn = styled.button`
    position: absolute;
    top: 40px;
    right: 40px;
    display: none;
    font-size: 1.15rem;
    color: ${(props) =>
        props.active ? props.theme.white.lighter : props.theme.red};
    transition: 1s cubic-bezier(0.29, 1.01, 1, -0.68);
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        display: block;
        top: 20px;
    }
`;

const navVariants = {
    top: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    scroll: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
};

export default function Header() {
    const navigate = useNavigate();
    // 상단바 메뉴 빨간 원 애니메이션을 위한 매칭작업

    // 상단바 스크롤 시 색상 변경
    const navAnimation = useAnimation();
    const { scrollY } = useScroll();

    // scroll값을 동적으로 받아오기
    useMotionValueEvent(scrollY, 'change', () => {
        if (scrollY.get() > 80) {
            navAnimation.start('scroll');
        } else {
            navAnimation.start('top');
        }
    });
    // 모바일 미디어 쿼리 메뉴버튼 토글링
    const [menu, setMenu] = useRecoilState(menuState);
    const toggleMenu = () => {
        setMenu((prev) => !prev);
    };

    return (
        <HeaderWrapper
            variants={navVariants}
            animate={navAnimation}
            initial={'top'}
            active={menu}
        >
            <HeaderContents>
                <Ryan onClick={() => navigate('/')}>RyanFlix</Ryan>
                <HeaderItems />
            </HeaderContents>
            <HeaderSearch />
            <GoBackBtn onClick={() => navigate(-1)}>
                <FaBackward />
            </GoBackBtn>
            <MenuToggleBtn onClick={toggleMenu} active={menu}>
                <FaBars />
            </MenuToggleBtn>
        </HeaderWrapper>
    );
}
