import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Style Wrappers
import PageWrapper from './components/layout/PageWrapper';

// Page Views
import Home from './pages/Home';
import Cours from './pages/Cours';
import Abonnements from './pages/Abonnements';
import LocationPage from './pages/Location';
import Videos from './pages/Videos';
import VideoPlayer from './pages/VideoPlayer';
import Profil from './pages/Profil';
import Connexion from './pages/Connexion';
import Essai from './pages/Essai';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* Global Notification Toast styling container */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#FDFAF4',
                color: '#1C1917',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                borderRadius: '16px',
                border: '1px solid rgba(120, 110, 90, 0.15)',
                padding: '12px 18px',
                boxShadow: '0 4px 12px rgba(28, 25, 23, 0.05)'
              },
              success: {
                iconTheme: {
                  primary: '#1A3328',
                  secondary: '#FDFAF4'
                }
              },
              error: {
                iconTheme: {
                  primary: '#C4603E',
                  secondary: '#FDFAF4'
                }
              }
            }}
          />

          {/* Dynamic application wrapper routing structure */}
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cours" element={<Cours />} />
              <Route path="/abonnements" element={<Abonnements />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos/:id" element={<VideoPlayer />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/essai" element={<Essai />} />
              
              {/* Fallback to homepage router */}
              <Route path="*" element={<Home />} />
            </Routes>
          </PageWrapper>

        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
