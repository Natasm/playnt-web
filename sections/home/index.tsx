import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ContextState } from '../../redux/state/context';
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

    return (

        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">

            <AppBarMain />

            <div style={{ paddingLeft: 20, paddingTop: 200, paddingBottom: 100 }}>
                <FeaturedDescription />
            </div>

            <TrendingList />
            
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