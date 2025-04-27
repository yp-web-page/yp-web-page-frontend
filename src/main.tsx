import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes/Routes.tsx';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import './styles/fonts.css';
import { ErrorBoundary } from './context/ErrorBoundary.tsx';

const root = document.getElementById('root')

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 6, 
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      return query.queryKey[0] === 'carousel-images';
    }
  }
});


createRoot(root!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
      <ModalProvider>
      <AuthProvider>
          <RouterProvider router={router}/>
      </AuthProvider>
      </ModalProvider>
      </ErrorBoundary>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
)
