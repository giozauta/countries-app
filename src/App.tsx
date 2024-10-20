import './App.css';
import {Routes, Route,Navigate} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import DefaultLayout from '@/layouts/default';
import NotFoundPage from '@/pages/404';
import SingleCardView from '@/pages/cards/views/single';


const CardsListview = lazy(() => import('~/src/pages/cards/views/list'));
const AboutViews = lazy(() => import('@/pages/about'));
const ContactViews = lazy(() => import('@/pages/contact/views'));

const App: React.FC = () => {


  return (
      <Routes>
        <Route path="/:lang"  element={<DefaultLayout/>}>
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
        </Route>

        <Route path="/" element={<Navigate to="/en/cards" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default App;



/*ეს css ესე დროებით სანამ Landing Page ზე გადავწყვიტავ საბოლოოდ რა გამომაქვს 
const LandingPageCss:React.CSSProperties={
  width:"100%",
  height:"1040px",
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover',
  position:"relative",
}
const img:React.CSSProperties= {
  width:"100%",
  height:"1180px",
  position:"absolute",
  top:0,
  zIndex:-1,
  overflow:"hidden",
}
 <Route path='/'element ={<div style={LandingPageCss}><img style={img} src="/images/earth1.jpg"/></div>}/>
*/