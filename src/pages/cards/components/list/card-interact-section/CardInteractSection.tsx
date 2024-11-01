import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./cardInteractSection.module.css";

type LanguageString = {
  en: string;
  ka: string;
};
type CountryType = {
  countryName: LanguageString;
  capitalCity: LanguageString;
  population: number;
  article: LanguageString;
  imgSrc: string;
  id: string;
  vote: number;
  deleteStatus: boolean;
};

type CardInteractSectionProps = {
  handleDeleteCard: (id: string) => void;
  country: CountryType;
  handleCountriesVote: (id: string) => void;
};

const CardInteractSection: React.FC<CardInteractSectionProps> = ({
  country,
  handleCountriesVote,
  handleDeleteCard,
  
}) => {
  const { lang } = useParams();
  const currentLang = lang ?? "en";

  return (
    <div
      className={
        country.deleteStatus
          ? styles.cardButtonSectionDisabled
          : styles.cardButtonSectionActive
      }
    >
      <div className={styles.cardButtonSectionOne}>
        <Link to={`${country.id}`} className={styles.readMoreBtn}>
          {currentLang === "en" && <h3>Read more</h3>}
          {currentLang === "ka" && <h3>მეტის ნახვა</h3>}
        </Link>
      </div>
      <div className={styles.cardButtonSectionTwo}>
        <div className={styles.voteSection}>
          <button
            onClick={() => handleCountriesVote(country.id)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img alt="like" className={styles.likeIcon} src="/icons/like.png" />
          </button>
          <p>{country.vote}</p>
        </div>
        <button
          onClick={() => handleDeleteCard(country.id)}
          className={styles.cardDeleteButton}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CardInteractSection;
