import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { translateForPortuguese } from "../utils/utils"

interface Props {
    tracks: any,
    selectedAudio: any,
    selectAudio: any
}

export default function AudioTracks(props: Props) {

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        init()
    }, [props.tracks])

    const init = async () => {
        const contains = await containsTrackAudio(Object.values(props.tracks))

        if (contains) {
            setTracks(Object.values(props.tracks))
        }
    }

    const containsTrackAudio = async (tracks: any) => {
        if (tracks) {
            for await (var track of tracks) {
                if (track.type == 'audio' || track.kind == 'main') return true
            }
            return false
        } else {
            return false
        }
    }

    return (
        <>
            {
                tracks?.length > 0 &&
                <FormControl>
                    <InputLabel 
                        sx={{ color: 'white' }}>Áudio</InputLabel>
                    <Select
                        label="Áudio"
                        sx={{ color: 'white' }}
                        value={props.selectedAudio}
                        onChange={props.selectAudio}
                    >
                        {
                            tracks && tracks?.map((track: any) => {
                                if (track.type == 'audio' || track.kind == 'main')
                                    return (
                                        <MenuItem
                                            key={'audio' + track.id + Math.random()}
                                            value={track.id}
                                        >
                                            {translateForPortuguese(track.lang || track.language) || track.id}
                                        </MenuItem>
                                    )
                            })
                        }
                    </Select>
                </FormControl>
            }
        </>
    )
}