import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage
    }
], {
    basename: '/yanca-publicity',
})

export { router };