import {
	formatBandWidth,
	formatProgress
} from '../utils/utils'

import { useSelector } from 'react-redux';

import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/store';
import { setRouteActionTriggered } from '../../../redux/actions';

interface Props {
	speedDownload: number,
	progressDownload: number
}

export default function InfoStream(props: Props) {

	const dispatch = useAppDispatch()

	const router = useRouter()

	const offline = useSelector((state: any) => state.offline)

	return (
		<Container sx={{ paddingTop: 4 }}>
			<Stack direction="row" justifyContent="space-between">
				<Stack>
					<Button 
						variant="contained" 
						sx={{ color: 'black', backgroundColor: 'white'}} 
						onClick={() => {
							dispatch(setRouteActionTriggered("POP"))
							router.back()
						}}
					>
						Voltar
					</Button>
				</Stack>

				{
					!offline.isMediaOffline &&
					<Stack direction="column">
						<Typography sx={{ color: 'white', zIndex: 0 }}>
							{"Velocidade: " + formatBandWidth(props.speedDownload || 0)}
						</Typography>

						<Typography sx={{ color: 'white', zIndex: 0 }}>
							{"Progresso: " + formatProgress(props.progressDownload || 0)}
						</Typography>
					</Stack>
				}
			</Stack >
		</Container>
	);
}