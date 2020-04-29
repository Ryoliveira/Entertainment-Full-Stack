import { MediaRating } from './media-rating';

export class Media {

    id: string;
    title: string;
    year: string;
    rated: string;
    released: string;
    season: string;
    episode: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    metascore: string;
    imdbRating: string;
    imdbVotes: String;
    imdbId: string;
    seriesId: string;
    type: string;
    dvd: string;
    totalSeasons: string;
    boxOffice: string;
    production: string;
    website: string;
    mediaRatings: MediaRating[];
}
