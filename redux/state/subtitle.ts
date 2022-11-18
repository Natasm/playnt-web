import { FileSubtitle, Subtitle } from "../../models/subtitle"

interface SubtitleStateInterface {
    subtitles?: Subtitle[]
    filesSubtitleChoiced?: FileSubtitle[]
}

export class SubtitleState {
    subtitles: Subtitle[]
    filesSubtitleChoiced: FileSubtitle[]

    constructor(subtitle: SubtitleStateInterface) {
        this.subtitles = subtitle.subtitles || []
        this.filesSubtitleChoiced = subtitle.filesSubtitleChoiced || []
    }
}
