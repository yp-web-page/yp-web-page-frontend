import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    createBrowserRouter,
} from 'react-router';

import HomePage from '../pages/project/HomePage';
import RootLayout from '../layout/RootLayout';
import ProtectedRoute from '../components/protected/ProtectedRoute';

const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const LegalAdvicePage = lazy(() => import('../pages/legal/LegalAdvicePage'));
const PrivacyPolicyPage = lazy(() => import('../pages/legal/PrivacyPolicyPage'));
const ChangePassword = lazy(() => import('../pages/changePassword/ChangePassword'));
const Inventory = lazy(() => import('../pages/project/Inventory'));
const ActiveUserAccount = lazy(() => import('../pages/activeUserRegularAccount/ActiveUserAccount'));
const Inventories = lazy(() => import('../pages/project/Inventories'));
const ContactUs = lazy(() => import('../pages/contactUs/ContactUs'));
const WhoArePage = lazy(() => import('../pages/whoAre/WhoArePage'));

export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />, // 👈 wrap all child routes
      errorElement: (
        <Suspense fallback={<LoadingSpinner />}>
          <PageNotFound />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute> 
              <Suspense fallback={<LoadingSpinner />}>
                <ProfilePage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: 'aviso-legal',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <LegalAdvicePage />
            </Suspense>
          ),
        },
        {
          path: 'politicas-privacidad',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <PrivacyPolicyPage />
            </Suspense>
          ),
        },
        {
          path: 'reset-password',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <ChangePassword />
            </Suspense>
          ),
        },
        {
          path: 'inventory/:inventoryId',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <Inventory />
            </Suspense>
          ),
        },
        {
          path: 'inventories',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <Inventories />
            </Suspense>
          ),
        },
        {
          path: 'activate-regular-account',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <ActiveUserAccount />
            </Suspense>
          ),
        },
        {
          path: 'who-are',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <WhoArePage />
            </Suspense>
          ),
        },
        {
          path: 'contact-us',
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <ContactUs />
            </Suspense>
          ),
        },
      ],
    },
  ]);