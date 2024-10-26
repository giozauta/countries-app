import styles from "./card.module.css";
import React, { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

type CardProps = {
  deleteStatus: boolean;
  id: string;
  handleCardRestore: (id: string, lang: string) => void;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  deleteStatus,
  handleCardRestore,
  id,
}) => {
  const { lang } = useParams();
  const currentLang = lang ?? "en";

  if (deleteStatus) {
    return (
      <div className={styles.deleteCard}>
        {children}
        <button
          onClick={() => handleCardRestore(id, currentLang)}
          className={styles.restoreButton}
        >
          {currentLang === "en" ? "Restore" : "აღადგინე"}
        </button>
      </div>
    );
  }
  return <div className={styles.card}>{children}</div>;
};

export default Card;
