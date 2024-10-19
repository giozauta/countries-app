import styles from './header.module.css';
import { NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import {data} from './header-content-data';


const Header: React.FC = () => {
  const { lang } = useParams();
  const contentData = data;
  const currentLang = lang||'en';


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
            <NavLink className={styles.langLinks} to="/ka/cards">{contentData[currentLang].ka}</NavLink>
            <NavLink className={styles.langLinks} to="/en/cards">{contentData[currentLang].en}</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
