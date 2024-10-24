import './App.css';
import {Routes, Route,Navigate} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import DefaultLayout from '@/layouts/default';
import NotFoundPage from '@/pages/404';
import SingleCardView from '@/pages/cards/views/single';
import LangGuard from './components/Lang-guard';

const CardsListview = lazy(() => import('~/src/pages/cards/views/list'));
const AboutViews = lazy(() => import('@/pages/about'));
const ContactViews = lazy(() => import('@/pages/contact/views'));

const App: React.FC = () => {


  return (
      <Routes>
        <Route path=':lang' element={<LangGuard />}>
          <Route element={<DefaultLayout/>}>
            <Route
              path="cards"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <CardsListview />
                </Suspense>
              }
            />
            <Route 
              path='cards/:id'
              element={
                <SingleCardView/>
              }            
            />
        
            <Route
              path="about"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <AboutViews />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <ContactViews />
                </Suspense>
              }
            />
             <Route path="" element={<Navigate to="cards" />} />
          </Route>
        </Route> 
        <Route path="/" element={<Navigate to="/en/cards" />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default App;
