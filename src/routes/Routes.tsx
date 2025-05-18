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
import Inventory from '../pages/project/Inventory';
import ActiveUserAccount from '../pages/activeUserRegularAccount/ActiveUserAccount';
import Inventories from '../pages/project/Inventories';
import ProtectedRoute from '../components/protected/ProtectedRoute';

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
          element: (
            <ProtectedRoute> 
              <ProfilePage /> 
            </ProtectedRoute>),
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
        {
          path: 'inventory/:inventoryId',
          element: <Inventory />,
        },
        {
          path: 'inventories',
          element: <Inventories />,
        },
        {
          path: 'activate-regular-account',
          element: <ActiveUserAccount />,
        }
      ],
    },
  ]);