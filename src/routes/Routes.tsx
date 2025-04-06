import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';
import PageNotFound from '../pages/PageNotFound';
import ProfilePage from '../pages/profile/ProfilePage';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
        errorElement: <PageNotFound/>,
    },
    {
        path: '/profile',
        Component: ProfilePage,
    }
])

export { router };