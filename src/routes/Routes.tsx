import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';
import PageNotFound from '../pages/PageNotFound';
import ProfilePage from '../pages/profile/ProfilePage';
import LegalAdvicePage from '../pages/legal/LegalAdvicePage';
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
        errorElement: <PageNotFound/>,
    },
    {
        path: '/profile',
        Component: ProfilePage,
    },
    {
        path: '/aviso-legal',
        Component: LegalAdvicePage,
    },
    {
        path: '/politicas-privacidad',
        Component: PrivacyPolicyPage,
    },
])

export { router };