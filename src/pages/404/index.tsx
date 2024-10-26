import styles from "./404.module.css";
import { Link } from "react-router-dom"; // Use Link for navigation

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundBox}>
      <div className={styles.notFoundText}>
        <h1>404 the page you are looking for not avaible! click here :</h1>
        <h1>
          <Link className={styles.notFoundLink} to="/">
            go home
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
