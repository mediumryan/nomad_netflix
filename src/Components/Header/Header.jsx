import {
    motion,
    useScroll,
    useMotionValueEvent,
    useAnimation,
} from 'framer-motion';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// import components
import HeaderSearch from './HeaderSearch';
import HeaderItems from './HeaderItems';
// import icons
import { FaBackward, FaBars } from 'react-icons/fa';
// import state data
import { menuState } from '../../atom';

const HeaderWrapper = styled(motion.nav)`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem 1.5rem 2rem;
    color: var(--white-100);
    z-index: 4;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
    }
`;

const HeaderContents = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const HeaderContentsInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 100%;
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
    }
`;

const GoBackBtn = styled(FaBackward)`
    display: none;
    color: ${(props) => props.theme.red};
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        display: block;
    }
`;

const MenuToggleBtn = styled(FaBars)`
    display: none;
    color: ${(props) =>
        props.active ? props.theme.white.lighter : props.theme.red};
    transition: 1s cubic-bezier(0.29, 1.01, 1, -0.68);
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        display: block;
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
                <HeaderContentsInner>
                    <GoBackBtn onClick={() => navigate(-1)} />
                    <Ryan onClick={() => navigate('/')}>RyanFlix</Ryan>
                    <MenuToggleBtn onClick={toggleMenu} active={menu} />
                </HeaderContentsInner>
                <HeaderItems />
            </HeaderContents>
            <HeaderSearch />
        </HeaderWrapper>
    );
}
