import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';
import PageNotFound from '../pages/PageNotFound';
import ProfilePage from '../pages/profile/ProfilePage';
import LegalAdvicePage from '../pages/legal/LegalAdvicePage';
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage';
import RootLayout from '../layout/RootLayout';
import ChangePassword from '../pages/changePassword/ChangePassword';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />, // 👈 wrap all child routes
      errorElement: <PageNotFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'aviso-legal',
          element: <LegalAdvicePage />,
        },
        {
          path: 'politicas-privacidad',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'reset-password',
          element: <ChangePassword />,
        },
      ],
    },
  ]);