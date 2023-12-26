import { styled } from 'styled-components';
import SearchItem from './SearchItem';

const SearchGridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-gap: 1.5rem;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default function SearchGrid({ data }) {
    return (
        <SearchGridWrapper>
            {data.map((item) => {
                return <SearchItem data={item} key={item.id} />;
            })}
        </SearchGridWrapper>
    );
}
