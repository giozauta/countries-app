import styles from "./card.module.css";
import React, { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

type CardProps = {
  deleteStatus: boolean;
  id: string;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  deleteStatus,
}) => {
  const { lang } = useParams();
  const currentLang = lang ?? "en";

  if (deleteStatus) {
    return (
      <div className={styles.deleteCard}>
        {children}
        <button
          
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
