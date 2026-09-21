import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalManager from '../components/modals/ModalManager';
import ProfileCompletionBanner from '../components/ProfileCompletionBanner';

const RootLayout = () => {
  return (
    <>
      <Header />
      <ProfileCompletionBanner />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ModalManager />
    </>
  );
};

export default RootLayout;