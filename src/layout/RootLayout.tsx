// layout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ModalProvider } from '../context/ModalContext';

/**
 * RootLayout is used to wrap all pages with shared layout components 
 * like Header, Footer, and global context providers such as ModalProvider.
 * 
 * This ensures that:
 * - Global UI (like modals) works correctly via context (e.g., useModal).
 * - Layout is consistent across all routes (Header/Footer are not duplicated).
 * - React Contexts are accessible to all child routes without needing
 *   to manually include them in each page/component.
 * 
 * Without this layout, components using context (like `useModal`) would
 * throw an error if used outside their provider.
 */
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;