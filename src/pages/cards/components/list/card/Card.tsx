import styles from "./card.module.css";
import React, { PropsWithChildren } from "react";


type CardProps = {
  deleteStatus: boolean;
  id: string;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
}) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
