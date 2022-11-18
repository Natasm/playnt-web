export interface MediaWebScraper {
    magnet: string;
    type: string;
    resolution: string;
    files: File[];
}

export interface FileWebScraper {
    name: string;
}

export interface MovieWebScraper {
    name: string;
    imagePath: string;
    imdb: string;
    media: MediaWebScraper[];
}

export interface SerieWebScraper {
    name: string;
    imagePath: string;
    imdb: string;
    seasons: SeasonWebScraper[];
}

export interface SeasonWebScraper {
    seasonNumber: number;
    episodes: EpisodeWebScraper[];
}

export interface EpisodeWebScraper {
    episodeNumberRange: string;
    media: MediaWebScraper[];
}