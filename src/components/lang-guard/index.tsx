import { useParams, Outlet, Navigate } from "react-router-dom";

const LangGuard = () => {
  const { lang } = useParams();
  const currentLang = lang ?? "en";
  const langs = ["en", "ka"];

  if (!langs.includes(currentLang)) {
    return <Navigate to={"/en/cards"} />;
  }
  return <Outlet />;
};

export default LangGuard;
