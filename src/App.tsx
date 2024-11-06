import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefaultLayout from "@/layouts/default";
import NotFoundPage from "@/pages/404";
import SingleCardView from "@/pages/cards/views/single";
import LangGuard from "@/components/lang-guard";

const CardsListview = lazy(() => import("~/src/pages/cards/views/list"));
const AboutViews = lazy(() => import("@/pages/about"));
const ContactViews = lazy(() => import("@/pages/contact/views"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
    <Routes>
      <Route path=":lang" element={<LangGuard />}>
        <Route element={<DefaultLayout />}>
          <Route
            path="cards"
            element={
                <CardsListview />
            }
          />
          <Route path="cards/:id" element={<SingleCardView />} />

          <Route
            path="about"
            element={
                <AboutViews />
            }
          />
          <Route
            path="contact"
            element={
                <ContactViews />
            }
          />
          <Route path="" element={<Navigate to="cards" />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/en/cards" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  );
};

export default App;
