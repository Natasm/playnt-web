import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { PlayerState } from '../../../redux/state/player';
import { SerieChoicedState } from '../../../redux/state/serieChoiced';
import { MediaChoicedState } from '../../../redux/state/mediaChoiced';
import DialogSerieFiles from '../../catalog/serie/title/dialog-files';

export default function NextEpisodeButton() {

    const dispatch = useAppDispatch()

    const playerRedux: PlayerState = useSelector((state: any) => state.player)

    const mediaChoicedRedux: MediaChoicedState = useSelector((state: any) => state.mediaChoiced)

    const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

    const [openDialogSerie, setOpenDialogSerie] = useState(false)

    const [info, setInfo] = useState<any>()

    const goNextEpisode = async () => {
    }

    return (
        <>
            <DialogSerieFiles
                open={openDialogSerie}
                onClose={() => setOpenDialogSerie(false)}
            />

            {
                mediaChoicedRedux.episodeMediaId &&
                <Button
                    variant="contained"
                    sx={{ color: 'white', backgroundColor: 'gray' }}
                    onClick={goNextEpisode}
                >
                    {info?.nextEpisode && `Próximo: Episódio ${info?.nextEpisode}`}
                </Button>
            }
        </>
    );
}