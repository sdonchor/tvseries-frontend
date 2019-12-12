import Vue from 'vue'
import VueRouter from 'vue-router'
import TvSeries from '../components/TvSeries';
import TvSeriesList from '../components/TvSeriesList';
import Index from "../components/Index";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/series',
            name: 'TvSeriesList',
            component: TvSeriesList,
            props: {
                auth:null
            }
        },
        {
            path: '/series/:id',
            name: 'TvSeries',
            component: TvSeries,
            props: {
                auth:null
            }
        }
    ]
})