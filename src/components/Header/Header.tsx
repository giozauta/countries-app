
import styles from './header.module.css';
import { NavLink,NavLinkRenderProps} from 'react-router-dom';


const Header: React.FC = () => {

  const handleActiveNav = (props:NavLinkRenderProps) => {
    const {isActive} = props;
    return isActive ? styles.navLinkActive : styles.navLink
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div>
          <NavLink className={styles.logo} to="/"><h1>Countries App</h1></NavLink>
        </div>
        <div className={styles.navButtons}>
          <NavLink className={handleActiveNav}to="/cards">
            <p>Cards</p>
          </NavLink>
          <NavLink className={handleActiveNav} to="/about">
            <p>About</p>
          </NavLink>
          <NavLink className={handleActiveNav}to="/contact">
            <p>Contact</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;