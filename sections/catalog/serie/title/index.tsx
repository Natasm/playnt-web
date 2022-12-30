import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setTMDBSerieChoicedReducer } from "../../../../redux/actions";
import { ContextState } from "../../../../redux/state/context";
import { SerieChoicedState } from "../../../../redux/state/serieChoiced";
import { useAppDispatch } from "../../../../redux/store";
import { FindCatalogTMDBRequest } from "../../../../services/catalog/interface/request.interface";
import { findCatalogTMDB } from "../../../../services/catalog/titles";
import AppBarSimple from "../../appBarSimple";
import Background from "./background";
import Title from "./title"

export default function SerieTitle() {

  const dispatch = useAppDispatch()

  const contextRedux: ContextState = useSelector((state: any) => state.context)
  const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

  useEffect(() => {
    getInfo()
  }, [serieChoicedRedux?.serie?.imdb])

  const getInfo = async () => {
    if (serieChoicedRedux?.serie?.imdb) {

      const findCatalogTMDBRequest: FindCatalogTMDBRequest = {
        imdbId: serieChoicedRedux?.serie?.imdb,
        seasonNumber: serieChoicedRedux?.serie?.seasons[0].seasonNumber
      }
      
      const response = await findCatalogTMDB(findCatalogTMDBRequest)

      dispatch(setTMDBSerieChoicedReducer(response))
    }
  }

  return (
    <>
      <Background url={serieChoicedRedux?.tmdb?.tv_results[0]?.backdrop_path || ""}>

        <AppBarSimple />

        <div style={{ paddingTop: 100 }}>
          <Title />
        </div>

      </Background>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={contextRedux.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}