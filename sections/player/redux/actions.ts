import { Dispatch } from "redux"
import { FileSubtitle, Subtitle } from "../../../models/subtitle"
import { setLoadingReducer, setSubtitlesReducer } from "../../../redux/actions"
import { getSubtitles } from "../../../services/catalog/subtitle"

export const searchSubtitleAction = (query: string, page: number) => {
    return async function (dispatch: Dispatch) {
        try {
            dispatch(setLoadingReducer(true))

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

                dispatch(setSubtitlesReducer(subtitles))
            } else {
                dispatch(setSubtitlesReducer([]))
            }

        } catch (e) {
            dispatch(setSubtitlesReducer([]))
            console.log(e)
        }
        finally {
            dispatch(setLoadingReducer(false))
        }
    }
}