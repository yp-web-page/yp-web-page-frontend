import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';
import PageNotFound from '../pages/PageNotFound';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
        errorElement: <PageNotFound/>,
    }
], {
    basename: '/yanca-publicity',
})

export { router };