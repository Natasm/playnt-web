import { FileSubtitle, Subtitle } from "../../models/subtitle"
import { SubtitleInterface } from "../interface/subtitle"

export class SubtitleState{
    subtitles: Subtitle[]
    filesSubtitleChoiced: FileSubtitle[] 

    constructor(subtitle: SubtitleInterface) {
        this.subtitles = subtitle.subtitles
        this.filesSubtitleChoiced = subtitle.filesSubtitleChoiced
    }
}
