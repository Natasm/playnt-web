import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { translateForPortuguese } from "../utils/utils"

interface Props {
  tracks: any,
  selectedSubtitle: any,
  selectSubtitle: any
}

export default function SubtitleTracks(props: Props) {

  const [tracks, setTracks] = useState([])

  useEffect(() => {
    setTracks(Object.values(props.tracks))
  }, [props.tracks])

  return (
    <FormControl>
      <InputLabel sx={{ color: 'white' }}>Legenda</InputLabel>
      <Select
        label="Legenda"
        sx={{ color: 'white' }}
        value={props.selectedSubtitle}
        onChange={props.selectSubtitle}
      >
        <MenuItem value={-1}>
          Legenda desativada
        </MenuItem>
        {
          tracks && tracks?.map((track: any) => {
            if (track.type == 'sub' || track.kind == 'subtitles')
              return (
                <MenuItem
                  key={'sub' + track.id + Math.random()}
                  value={track.id}
                >
                  {translateForPortuguese(track.lang) || ('Legenda ' + (track.label || track.id))}
                </MenuItem>
              )
          })
        }
      </Select>
    </FormControl>
  )
}