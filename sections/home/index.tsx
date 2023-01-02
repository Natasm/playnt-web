import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContextState } from '../../redux/state/context';
import { TMDBMoviePopularityDto } from '../../services/catalog/interface/response.interface';
import { getMoviesByPopularity } from '../../services/catalog/titles';
import AppBarMain from './appBar';
import Background from './background';
import ContinueWatching from './continue-watching';
import FeaturedDescription from './featured-description';
import TrendingList from './trendingList';

interface HomeProps {
    userId: number
    customerId?: number
}

export default function Home(props: HomeProps) {

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    const [data, setData] = useState<TMDBMoviePopularityDto[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await getMoviesByPopularity()

            if (response) {
                setData(response.results)
            }
        } catch (e) {

        }
    }

    return (

        <Background url={data[0]?.backdrop_path || ""}>

            <AppBarMain />

            <div style={{ paddingLeft: 20, paddingTop: 200, paddingBottom: 100 }}>
                <FeaturedDescription data={data[0]}/>
            </div>

            <TrendingList data={data}/>
            
            <ContinueWatching userId={props.userId} />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Background>
    );

}