import {
	formatBandWidth,
	formatProgress
} from '../utils/utils'

import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/store';
import { setRouteActionTriggeredReducer } from '../../../redux/actions';

interface Props {
	speedDownload: number,
	progressDownload: number
}

export default function InfoStream(props: Props) {

	const dispatch = useAppDispatch()

	const router = useRouter()

	return (
		<Container sx={{ paddingTop: 4 }}>
			<Stack direction="row" justifyContent="space-between">
				<Stack>
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
					<Typography sx={{ color: 'white', zIndex: 0 }}>
						{"Velocidade: " + formatBandWidth(props.speedDownload || 0)}
					</Typography>

					<Typography sx={{ color: 'white', zIndex: 0 }}>
						{"Progresso: " + formatProgress(props.progressDownload || 0)}
					</Typography>
				</Stack>

			</Stack >
		</Container>
	);
}