import { getMovieDetails } from '@/service/movieService';

interface MovieDetailProps {
  params: {
    id: string[];
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const MovieDetailData = await getMovieDetails(params.id[0]);

  return <div>page</div>;
}
