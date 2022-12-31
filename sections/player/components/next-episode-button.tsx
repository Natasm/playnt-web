import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { SerieChoicedState } from '../../../redux/state/serieChoiced';
import { MediaChoicedState } from '../../../redux/state/mediaChoiced';
import { EpisodeMediaResponse, EpisodeResponse, SeasonResponse, SerieResponse } from '../../../services/stream/interface/response.interface';
import { LoadTorrentRequest } from '../../../services/stream/interface/request.interface';
import { loadTorrentAction } from '../../catalog/redux/actions';
import { setFileNameStreamPlayerReducer, setInfoHashPlayerReducer, setSerieMediaChoicedReducer } from '../../../redux/actions';

interface NextEpisodeData {
    nextSerie: SerieResponse,
    nextSeason: SeasonResponse,
    nextEpisode: EpisodeResponse,
    nextEpisodeMedia: EpisodeMediaResponse
}

export default function NextEpisodeButton() {

    const dispatch = useAppDispatch()

    const router = useRouter()

    const mediaChoicedRedux: MediaChoicedState = useSelector((state: any) => state.mediaChoiced)

    const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

    const [nextEpisodeData, setNextEpisodeData] = useState<NextEpisodeData>()

    useEffect(() => {
        getNextEpisodeData()
    }, [mediaChoicedRedux])

    const getNextEpisodeData = async () => {
        
        var seasonIdCurrent = mediaChoicedRedux.seasonId
        var episodeIdCurrent = mediaChoicedRedux.episodeId
        var episodeMediaIdCurrent = mediaChoicedRedux.episodeMediaId
        
        var seasonFound = serieChoicedRedux.serie?.seasons?.find((season) => season.id == seasonIdCurrent)

        if (seasonFound) {
            
            var episodeIndex = seasonFound.episodes.findIndex((episode) => episode.id == episodeIdCurrent)

            if (episodeIndex != -1 && seasonFound.episodes.length > episodeIndex + 1) {

                var episodeMediaFound = seasonFound.episodes[episodeIndex].media.find((media) => media.id == episodeMediaIdCurrent)

                var nextEpisode = seasonFound.episodes[episodeIndex + 1]

                var nextEpisodeMedia = nextEpisode.media.find((media) => media.type == episodeMediaFound?.type)

                if (serieChoicedRedux.serie && nextEpisode && nextEpisodeMedia) {
                    setNextEpisodeData({
                        nextSerie: serieChoicedRedux.serie,
                        nextSeason: seasonFound,
                        nextEpisode,
                        nextEpisodeMedia
                    })
                }
            }
        }
    }

    const playNextEpisode = async () => {

        if (nextEpisodeData) {

            const request: LoadTorrentRequest = {
                magnet: nextEpisodeData.nextEpisodeMedia.magnet,
                episodeMediaId: nextEpisodeData.nextEpisodeMedia.id,
                episodeNumber: nextEpisodeData.nextEpisode.episodeNumber
            }

            const response = await dispatch(loadTorrentAction(request))

            if (response) {

                dispatch(setSerieMediaChoicedReducer({
                    episodeId: nextEpisodeData.nextEpisode.id,
                    episodeMediaId: nextEpisodeData.nextEpisodeMedia.id,
                    seasonId: nextEpisodeData.nextSeason.id,
                    serieId: nextEpisodeData.nextSerie.id
                }))

                dispatch(setInfoHashPlayerReducer(response.infoHash))
                dispatch(setFileNameStreamPlayerReducer(response.fileName))

                router.push("/player")
            }
        }
    }

    return (
        <>
            {
                nextEpisodeData &&
                <Button
                    variant="contained"
                    sx={{ color: 'white', backgroundColor: 'gray' }}
                    onClick={playNextEpisode}
                >
                    {`Próximo: Episódio ${nextEpisodeData.nextEpisode.episodeNumber}`}
                </Button>
            }
        </>
    );
}