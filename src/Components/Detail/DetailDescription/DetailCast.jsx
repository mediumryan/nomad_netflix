import { useQuery } from '@tanstack/react-query';
import { getMovieCredits } from '../../../api';
import { DescriptionItem } from './DetailDescription';

export default function DetailCast({ data, id }) {
    const { data: creditData, isLoading: creditDataIsLoading } = useQuery(
        ['detail', 'credit'],
        () => {
            return getMovieCredits(id);
        }
    );

    return (
        <DescriptionItem style={{ lineHeight: '1.5' }}>
            <span className="sub-title">출연진</span>
            {creditDataIsLoading
                ? 'Loading...'
                : creditData.cast
                      .slice(0, 4)
                      .map((cast) => cast.name)
                      .join(', ')}
        </DescriptionItem>
    );
}
