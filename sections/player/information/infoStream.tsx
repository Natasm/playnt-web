import {
	formatBandWidth,
	formatProgress
} from '../utils/utils'

import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/store';
import { resetMediaReducer, setRouteActionTriggeredReducer } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { PlayerState, PlayerTitleType } from '../../../redux/state/player';
import { SerieChoicedState } from '../../../redux/state/serieChoiced';
import { getSerieWebscraperFromImdbAndSeasonAction } from '../redux/actions';
import { postSerieWebScraperAction } from '../../catalog/serie/redux/actions';

interface Props {
	speedDownload: number,
	progressDownload: number
}

export default function InfoStream(props: Props) {

	const dispatch = useAppDispatch()

	const playerRedux: PlayerState = useSelector((state: any) => state.player)

	const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

	const router = useRouter()

	const showOtherEpisodes = async () => {
		if (serieChoicedRedux?.serie?.imdb && serieChoicedRedux?.serie?.seasons[0]?.seasonNumber) {

			const serieWebscraper = await dispatch(getSerieWebscraperFromImdbAndSeasonAction(
				serieChoicedRedux.serie.imdb,
				Number(serieChoicedRedux.serie.seasons[0].seasonNumber)
			))

			if (serieWebscraper) {
				dispatch(resetMediaReducer())

				await dispatch(postSerieWebScraperAction(serieWebscraper))

				router.replace('/catalog/serie')
			}
		}
	}

	return (
		<Container sx={{ paddingTop: 4 }}>
			<Stack direction="row" justifyContent="space-between">
				
				<Stack direction="column">
					<Button
						variant="contained"
						sx={{ color: 'black', backgroundColor: 'white' }}
						onClick={() => {
							dispatch(setRouteActionTriggeredReducer("POP"))
							router.back()
						}}
					>
						Voltar
					</Button>
				</Stack>

				<Stack direction="column">
					<Typography textAlign="center" sx={{ color: 'white', zIndex: 0, fontSize: 12 }}>
						Você está assistindo:
					</Typography>
					<Typography textAlign="center" sx={{ color: 'white', zIndex: 0, fontSize: 12 }}>
						{`${playerRedux.fileNameStream || ""}`}
					</Typography>
				</Stack>

				<Stack direction="column" textAlign="center" spacing={1}>

					<Typography sx={{ color: 'white', zIndex: 0 }}>
						{"Velocidade: " + formatBandWidth(props.speedDownload || 0)}
					</Typography>

					<Typography sx={{ color: 'white', zIndex: 0 }}>
						{"Progresso: " + formatProgress(props.progressDownload || 0)}
					</Typography>

					{
						playerRedux.titleType == PlayerTitleType.SERIE &&
						<Button
							variant="contained"
							sx={{ color: 'white', backgroundColor: 'gray' }}
							onClick={showOtherEpisodes}
						>
							Ver outros episódios
						</Button>
					}

				</Stack>

			</Stack >
		</Container>
	);
}