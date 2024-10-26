import styles from "./singleCard.module.css";
import { useParams } from "react-router-dom";

type LocalizedString = {
  en: string;
  ka: string;
};

type SingleCardProps = {
  cardData: {
    countryName: LocalizedString;
    capitalCity: LocalizedString;
    population: number;
    article: LocalizedString;
    imgSrc: string;
    id: string;
    vote: number;
    deleteStatus: boolean;
  };
};

const SingleCard: React.FC<SingleCardProps> = ({ cardData }) => {
  const { lang } = useParams();
  const currentLang = lang === "ka" ? "ka" : "en";

  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <img
          src={cardData.imgSrc}
          alt={cardData.countryName.en}
          className={styles.singleCardImage}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{cardData.countryName[currentLang]}</h2>
        <p className={styles.description}>{cardData.article[currentLang]}</p>
      </div>
    </div>
  );
};

export default SingleCard;
