import { styled } from 'styled-components';
import { DescriptionItem } from './DetailDescription';
import { getImages } from '../../../helper';

const NetWorkList = styled.ul`
    display: flex;
    align-items: center;
    li {
        width: 100px;
        height: 30px;
        padding: 0.25rem 0.5rem;
        position: relative;
        display: flex;
        background-color: rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        img {
            width: 100%;
        }
    }
`;

export default function DescriptionNetworks({ data, mediaType }) {
    return (
        <DescriptionItem
            style={{ display: mediaType === 'tv' ? 'flex' : 'none' }}
        >
            <span className="sub-title">방송</span>
            <NetWorkList>
                {data.networks.map((item) => {
                    return (
                        <li key={item.id}>
                            <img
                                src={getImages(item.logo_path)}
                                alt={item.name}
                            />
                        </li>
                    );
                })}
            </NetWorkList>
        </DescriptionItem>
    );
}
