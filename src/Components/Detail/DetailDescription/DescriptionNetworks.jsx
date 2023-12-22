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
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
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
                {data && mediaType === 'tv' ? (
                    <li>
                        <img
                            src={getImages(data.networks.logo_path)}
                            alt={data.networks.name}
                        />
                    </li>
                ) : (
                    mediaType === 'movie' && null
                )}
            </NetWorkList>
        </DescriptionItem>
    );
}
