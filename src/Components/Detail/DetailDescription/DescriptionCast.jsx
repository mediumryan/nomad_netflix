import { useQuery } from '@tanstack/react-query';
import { getMovieCredits, getTvShowCredits } from '../../../api';
import { DescriptionItem } from './DetailDescription';

export default function DescriptionCast({ id, mediaType }) {
    const { data: creditData, isLoading: creditDataIsLoading } = useQuery(
        ['detail', 'credit'],
        () => {
            return mediaType === 'movie'
                ? getMovieCredits(id)
                : mediaType === 'tv' && getTvShowCredits(id);
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
