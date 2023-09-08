import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { menuState } from '../../atom';

const SearchContainer = styled(motion.form)`
    color: white;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 820px) {
        display: ${(props) => (props.active === true ? 'flex' : 'none')};
    }
`;

const SearchIcon = styled(motion.svg)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-right: var(--margin-medium);
`;

const SearchBox = styled(motion.input)`
    width: 200px;
    transform-origin: left center;
    padding: var(--padding-double-small);
    color: white;
    font-size: var(--font-size-micro);
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
`;

const SearchBtn = styled(motion.button)`
    color: rgba(255, 255, 255, 1);
    margin-left: var(--margin-medium);
    background: none;
    font-size: var(--font-size-small);
`;

const HeaderSearch = () => {
    const navigate = useNavigate();
    const menu = useRecoilValue(menuState);

    // 서치바 애니메이션 토글링
    const [isSearching, setSearching] = useState(false);
    const toggleSearching = () => {
        setSearching((prev) => !prev);
    };

    // 서치값 받기
    const { register, handleSubmit, setValue } = useForm();
    const submitValue = (data) => {
        navigate(`/search/${data.query}`);
        setValue('query', '');
    };

    return (
        <SearchContainer onSubmit={handleSubmit(submitValue)} active={menu}>
            <SearchIcon
                onClick={toggleSearching}
                initial={{
                    rotateZ: isSearching ? 0 : 360,
                }}
                animate={{
                    rotateZ: isSearching ? 360 : 0,
                }}
                transition={{
                    type: 'linear',
                }}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                ></path>
            </SearchIcon>
            <SearchBox
                {...register('query', { required: true })}
                placeholder="Search movies, tv shows"
                initial={{
                    scaleX: isSearching ? 0 : 1,
                }}
                animate={{
                    scaleX: isSearching ? 1 : 0,
                }}
                transition={{
                    type: 'linear',
                }}
            />
            <SearchBtn
                initial={{
                    opacity: isSearching ? 0 : 1,
                    rotateZ: isSearching ? 0 : 360,
                }}
                animate={{
                    opacity: isSearching ? 1 : 0,
                    rotateZ: isSearching ? 360 : 0,
                }}
                whileHover={{
                    color: 'rgba(220, 20, 60, 1)',
                }}
                transition={{
                    type: 'linear',
                }}
            >
                <FaCheck />
            </SearchBtn>
        </SearchContainer>
    );
};

export default HeaderSearch;
