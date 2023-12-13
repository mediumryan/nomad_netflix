import {
    motion,
    useScroll,
    useMotionValueEvent,
    useAnimation,
} from 'framer-motion';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
    padding: 0.5rem 3rem;
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

const Logo = styled(motion.svg)`
    width: 75px;
    height: 75px;
    margin-right: 3rem;
    fill: ${(props) => props.theme.red};
    cursor: pointer;
    path {
        stroke-width: 12px;
        stroke: ${(props) => props.theme.white.darker};
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        margin: 0 0 1rem 0;
        height: 50px;
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
        top: 40px;
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

const logoVariants = {
    none: {
        fillOpacity: 0,
    },
    hover: {
        fillOpacity: [1, 0, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
        },
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
                <Logo
                    variants={logoVariants}
                    initial="none"
                    whileHover="hover"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1024"
                    height="276.742"
                    viewBox="0 0 1024 276.742"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </Logo>
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
