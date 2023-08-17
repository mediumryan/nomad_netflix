import {
    FaAngleDown,
    FaPlay,
    FaPlus,
    FaThumbsDown,
    FaThumbsUp,
} from 'react-icons/fa';
import {
    Info,
    InfoBtnBox,
    InfoBtnLeft,
    InfoBtn,
    infoVariants,
} from './MovieBoxInfo';

export default function TvBoxInfo({ item }) {
    return (
        <Info variants={infoVariants}>
            <h4>{item.name}</h4>
            <InfoBtnBox>
                <InfoBtnLeft>
                    <InfoBtn>
                        <FaPlay />
                    </InfoBtn>
                    <InfoBtn>
                        <FaPlus />
                    </InfoBtn>
                    <InfoBtn>
                        <FaThumbsUp />
                    </InfoBtn>
                    <InfoBtn>
                        <FaThumbsDown />
                    </InfoBtn>
                </InfoBtnLeft>
                <InfoBtn>
                    <FaAngleDown />
                </InfoBtn>
            </InfoBtnBox>
        </Info>
    );
}
