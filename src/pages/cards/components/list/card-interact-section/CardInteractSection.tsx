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
  isVoteLoading: boolean;
  isVoteError: boolean;
  isDeleteLoading: boolean;
  isDeleteError: boolean;
};

const CardInteractSection: React.FC<CardInteractSectionProps> = ({
  country,
  handleCountriesVote,
  handleDeleteCard,
  isVoteLoading,
  isVoteError,
  isDeleteLoading,
  isDeleteError,
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
          {currentLang === "en" && "Read more"}
          {currentLang === "ka" && "მეტის ნახვა"}
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
            <img alt="like" className={styles.likeIcon} src="../../../../../../public/icons/like.png" />
          </button>
          <p>
            {isVoteLoading ? (isVoteError ? 0 : country.vote) : country.vote}
          </p>
        </div>
        <button
          disabled={isDeleteLoading || isDeleteError}
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
