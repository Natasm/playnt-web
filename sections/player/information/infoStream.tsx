import {
	formatBandWidth,
	formatProgress
} from '../utils/utils'

import { Button, Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/store';
import { setRouteActionTriggeredReducer } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { PlayerState } from '../../../redux/state/player';
import NextEpisodeButton from '../components/next-episode-button';

import SpeedIcon from '@mui/icons-material/Speed';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

interface Props {
	speedDownload: number,
	progressDownload: number
}

export default function InfoStream(props: Props) {

	const dispatch = useAppDispatch()

	const playerRedux: PlayerState = useSelector((state: any) => state.player)

	const router = useRouter()

	return (
		<Box sx={{ padding: 4 }}>
			<Stack direction="row" justifyContent="space-between">

				<Stack direction="row">

					<Stack direction="column" justifyContent="center">
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

					<Stack direction="column" style={{ paddingLeft: 10 }} justifyContent="center">
						<Typography sx={{ color: 'white', zIndex: 0, fontSize: 20 }}>
							Você está assistindo:
						</Typography>
						<Typography sx={{ color: 'gray', zIndex: 0, fontSize: 12 }}>
							{`${playerRedux.fileNameStream || ""}`}
						</Typography>
					</Stack>

				</Stack>

				<Stack direction="column" textAlign="center" spacing={1}>

					<Stack direction="row" spacing={2} sx={{ zIndex: 0 }}>

						<SpeedIcon sx={{ color: "white" }} />

						<Typography sx={{ color: 'gray' }}>
							{formatBandWidth(props.speedDownload || 0)}
						</Typography>

					</Stack>

					<Stack direction="row" spacing={2} sx={{ zIndex: 0 }}>

						<DonutLargeIcon sx={{ color: "white" }} />

						<Typography sx={{ color: 'gray' }}>
							{formatProgress(props.progressDownload || 0)}
						</Typography>

					</Stack>

					<NextEpisodeButton />

				</Stack>

			</Stack >
		</Box>
	);
}