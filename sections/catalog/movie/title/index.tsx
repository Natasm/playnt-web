import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setTMDBMovieChoicedReducer } from "../../../../redux/actions";
import { ContextState } from "../../../../redux/state/context";
import { MovieChoicedState } from "../../../../redux/state/movieChoiced";
import { useAppDispatch } from "../../../../redux/store";
import { FindCatalogTMDBRequest } from "../../../../services/catalog/interface/request.interface";
import { findCatalogTMDB } from "../../../../services/catalog/titles";
import AppBarSimple from "../../appBarSimple";
import Background from "./background";
import Title from "./title";

export default function MovieTitle() {

  const dispatch = useAppDispatch()

  const contextRedux: ContextState = useSelector((state: any) => state.context)
  const movieChoicedRedux: MovieChoicedState = useSelector((state: any) => state.movieChoiced)

  useEffect(() => {
    getInfo()
  }, [movieChoicedRedux?.movie?.imdb])

  const getInfo = async () => {
    if (movieChoicedRedux?.movie?.imdb) {

      const findCatalogTMDBRequest: FindCatalogTMDBRequest = {
        imdbId: movieChoicedRedux?.movie?.imdb,
        seasonNumber: 0
      }
      
      const response = await findCatalogTMDB(findCatalogTMDBRequest)

      dispatch(setTMDBMovieChoicedReducer(response))
    }
  }

  return (
    <>
      <Background url={movieChoicedRedux?.tmdb?.movie_results[0]?.backdrop_path || ""}>

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