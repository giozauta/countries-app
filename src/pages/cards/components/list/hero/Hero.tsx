import styles from "./hero.module.css";
import { useParams } from "react-router-dom";

const Hero: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang ?? "en";

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        {currentLang === "en" ? (
          <p>
            {" "}
            A country is a distinct territory with defined borders, boundaries,
            people and government
          </p>
        ) : (
          <p>
            ქვეყანა არის ცალკეული ტერიტორია განსაზღვრული საზღვრებით, ხალხით და
            მთავრობით
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
