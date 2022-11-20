import axios from 'axios'
import { FindMovieRequest, FindSerieRequest, PostUserStreamRequest } from './interface/request.interface'
import { EpisodeCatalogResponse, FileCatalogResponse, MediaCatalogResponse, MovieCatalogResponse, SeasonCatalogResponse, SerieCatalogResponse, UserStreamWatchingResponse } from './interface/response.interface'
import { MovieWebScraper, SerieWebScraper } from './interface/webscraper.interface'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const getCatalogList = async (page: number) => {
    return axios.get(`${URL_API}/catalog?page=${page}`)
}

export const getCatalogListBySearch = async (search: string, page: number) => {
    return axios.get(`${URL_API}/catalog?search=${search}&page=${page}`)
}

export const postMovieWebscraper = async (movieWebScraper: MovieWebScraper) => {
    return axios.post<MovieCatalogResponse>(`${URL_API}/catalog/webscraper/movie`, movieWebScraper)
}

export const findMovie = async (findMovieRequest: FindMovieRequest) => {
    return axios.post<MovieCatalogResponse>(`${URL_API}/catalog/movie/find`, findMovieRequest)
}

export const postSerieWebscraper = async (serieWebScraper: SerieWebScraper) => {
    return axios.post<SerieCatalogResponse>(`${URL_API}/catalog/webscraper/serie`, serieWebScraper)
}

export const findSerie = async (findSerieRequest: FindSerieRequest) => {
    return axios.post<SerieCatalogResponse>(`${URL_API}/catalog/serie/find`, findSerieRequest)
}

export const postUserStream = async (postUserStreamRequest: PostUserStreamRequest) => {
    return axios.post(`${URL_API}/userStream`, postUserStreamRequest)
}

export const getUserStreamWatching = async (userId: number): Promise<UserStreamWatchingResponse[]> => {
    
    const response = await axios.post(`${URL_API}/userStream/watching`, { userId })

    var watchings: UserStreamWatchingResponse[] = []

    for await (var watching of response.data) {
        if (watching?.media?.movie) {

            var fileCatalogResponse: FileCatalogResponse = {
                id: watching.file.id,
                name: watching.file.name
            }

            var mediaCatalogResponse: MediaCatalogResponse = {
                id: watching.media.id,
                magnet: watching.media.magnet,
                type: watching.media.type,
                resolution: watching.media.resolution,
                files: [fileCatalogResponse]
            }

            var movieCatalogResponse: MovieCatalogResponse = {
                id: watching.media.movie.id,
                imagePath: watching.media.movie.imagePath,
                imdb: watching.media.movie.imdb,
                name: watching.media.movie.name,
                media: [mediaCatalogResponse]
            }

            var watchingItem: UserStreamWatchingResponse = {
                id: watching.id,
                watchedTill: watching.watchedTill,
                watchingMovie: movieCatalogResponse,
            }

            watchings.push(watchingItem)

        } else if (watching?.media?.episode?.season?.serie) {

            var fileCatalogResponse: FileCatalogResponse = {
                id: watching.file.id,
                name: watching.file.name
            }

            var mediaCatalogResponse: MediaCatalogResponse = {
                id: watching.media.id,
                magnet: watching.media.magnet,
                type: watching.media.type,
                resolution: watching.media.resolution,
                files: [fileCatalogResponse]
            }

            var episodeCatalogResponse : EpisodeCatalogResponse = {
                id: watching.media.episode.id,
                episodeNumberRange: watching.media.episode.episodeNumberRange,
                media: [mediaCatalogResponse]
            }

            var seasonCatalogResponse: SeasonCatalogResponse = {
                id: watching.media.episode.season.id,
                seasonNumber: watching.media.episode.season.seasonNumber,
                episodes: [episodeCatalogResponse]
            }

            var serieCatalogResponse: SerieCatalogResponse = {
                id: watching.media.episode.season.serie.id,
                name: watching.media.episode.season.serie.name,
                imagePath: watching.media.episode.season.serie.imagePath,
                imdb: watching.media.episode.season.serie.imdb,
                seasons: [seasonCatalogResponse]
            }

            var watchingItem: UserStreamWatchingResponse = {
                id: watching.id,
                watchedTill: watching.watchedTill,
                watchingSerie: serieCatalogResponse
            }

            watchings.push(watchingItem)
        }
    }

    return watchings;
}

export const deleteUserStream = async (userStreamId: number) => {
    return await axios.delete(`${URL_API}/userStream`, { data: { userStreamId } })
}