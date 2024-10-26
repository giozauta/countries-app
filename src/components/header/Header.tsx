import styles from "./header.module.css";
import {
  NavLink,
  NavLinkRenderProps,
  useLocation,
  useParams,
} from "react-router-dom";
import { data } from "./header-content-data";

type currentDataType = {
  [key: string]: {
    appName: string;
    cards: string;
    about: string;
    contact: string;
    en: string;
    ka: string;
  };
};

const Header: React.FC = () => {
  const { lang } = useParams();
  const contentData: currentDataType = data;
  const currentLang = lang ?? "en";
  const location = useLocation();
  const currentPage = location.pathname.slice(3);

  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;
    return isActive ? styles.navLinkActive : styles.navLink;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div>
          <NavLink className={styles.logo} to="/">
            <h1>{contentData[currentLang].appName}</h1>
          </NavLink>
        </div>
        <nav className={styles.navButtons}>
          <NavLink className={handleActiveNav} to={`cards`}>
            <p>{contentData[currentLang].cards}</p>
          </NavLink>
          <NavLink className={handleActiveNav} to={`about`}>
            <p>{contentData[currentLang].about}</p>
          </NavLink>
          <NavLink className={handleActiveNav} to={`contact`}>
            <p>{contentData[currentLang].contact}</p>
          </NavLink>
          {/* Language switch links */}
          <div className={styles.LanguageLinksBox}>
            <NavLink className={styles.langLinks} to={"/ka" + currentPage}>
              {contentData[currentLang].ka}
            </NavLink>
            <NavLink className={styles.langLinks} to={"/en" + currentPage}>
              {contentData[currentLang].en}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
