import { Dispatch } from "redux"
import { FileSubtitle, Subtitle } from "../../models/subtitle"
import { setLoadingGlobal, setSubtitlesRedux } from "../actions"
import { getSubtitles } from "../../services/catalog/subtitle"

export const searchSubtitle = (query: string, page: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingGlobal(true))

            const response = await getSubtitles(query, page)

            if (response?.data) {

                var subtitles: Subtitle[] = []

                for await (var element of response.data) {
                    var subtitle = new Subtitle()
                    subtitle.title = element.title
                    subtitle.forced = element.forced
                    subtitle.files = []

                    for await (var file of element.files) {
                        var fileSubtitle = new FileSubtitle()
                        fileSubtitle.id = file.id
                        fileSubtitle.file_name = file.file_name
                        
                        subtitle.files.push(fileSubtitle)
                    }

                    subtitles.push(subtitle)
                }

                dispatch(setSubtitlesRedux(subtitles))
            } else {
                dispatch(setSubtitlesRedux([]))
            }

        } catch (e) {
            dispatch(setSubtitlesRedux([]))
            console.log(e) 
        }
        finally {
            dispatch(setLoadingGlobal(false))
        }
    }
}