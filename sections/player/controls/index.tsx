import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { formatTime } from "../utils/utils";
import AudioTracks from "./audioTracks";
import SeekBar from "./seekBar";
import SubtitleTracks from "./subtitleTracks";
import { SubtitleDialog } from "../dialog/subtitle";
import { useMediaQuery, useTheme } from "@material-ui/core";

interface Props {
    duration: number,
    timePosition: number,
    handleSeek: any,

    pause: boolean,

    handlePlayPause: any,

    audioTracks: any,
    selectedAudio: any,
    audioChange: any,

    subtitleTracks: any,
    selectedSubtitle: any,
    subtitleChange: any,

    mutedAudio?: boolean,
    mutedAudioChange?: any
}

export default function ControlsPlayer(props: Props) {

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Container sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0,0.7),rgba(0,0,0,0,0.2))', }}>

            <SeekBar
                duration={props.duration}
                timePosition={props.timePosition}
                handleSeek={props.handleSeek}
            />

            <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: 'white', zIndex: 0 }} variant="button" gutterBottom>
                    {formatTime(props.timePosition)}
                </Typography>

                <Typography sx={{ color: 'white', zIndex: 0 }} variant="button" gutterBottom>
                    {formatTime(props.duration)}
                </Typography>
            </Stack>

            <Grid direction={largeScreen ? 'row' : 'column'} container spacing={1}>

                <Grid xs={1} item>
                    {
                        props.pause ?
                            <Button onClick={props.handlePlayPause}>
                                <PlayArrowIcon
                                    sx={{ zIndex: 0, color: 'white', fontSize: 30, padding: 0.5 }}
                                />
                            </Button>
                            :
                            <Button onClick={props.handlePlayPause}>
                                <PauseIcon sx={{ zIndex: 0, color: 'white', fontSize: 30, padding: 0.5 }} />
                            </Button>
                    }
                </Grid>

                <Grid xs={9} item>
                    <AudioTracks
                        tracks={props.audioTracks}
                        selectedAudio={props.selectedAudio}
                        selectAudio={props.audioChange}
                    />

                    <SubtitleTracks
                        tracks={props.subtitleTracks}
                        selectedSubtitle={props.selectedSubtitle}
                        selectSubtitle={props.subtitleChange}
                    />

                    <SubtitleDialog />
                </Grid>

                <Grid xs={2} item>
                    <Button sx={{ float: 'right' }} onClick={props.mutedAudioChange}>
                        {
                            props.mutedAudio ?
                                <VolumeOffIcon sx={{ zIndex: 0, color: 'white', fontSize: 30 }} /> :
                                <VolumeUpIcon sx={{ zIndex: 0, color: 'white', fontSize: 30 }} />
                        }
                    </Button>
                </Grid>

            </Grid>
        </Container >
    )
}