import { Slider } from "@mui/material"

interface Props {
  duration: number,
  timePosition: number,

  handleSeek: any
}

export default function SeekBar(props: Props) {

    return (
        <Slider 
          id='sliderdoteste'
          sx={{ color: 'white' }}
          defaultValue={0} 
          min={0} 
          max={props.duration || 0} 
          step={1}
          
          value={props.timePosition}
          
          onChange={(event, value) => { 
            props.handleSeek(value) 
          }}
        />
    )
}