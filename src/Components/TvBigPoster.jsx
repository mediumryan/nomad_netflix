import { getImages } from '../helper';
import { BigPoster, BigTitle, BigStory } from './MovieBigPoster';

export default function TvBigPoster({ bigPosterValues }) {
    return (
        <BigPoster bg_path={getImages(bigPosterValues.poster_path)}>
            <BigTitle>{bigPosterValues.name}</BigTitle>
            <BigStory>{bigPosterValues.overview}</BigStory>
        </BigPoster>
    );
}
