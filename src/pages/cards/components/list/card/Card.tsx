import styles from './card.module.css';
import React, { PropsWithChildren } from 'react';

const Card: React.FC<PropsWithChildren> = ({ children}) => {
  return (<div className={styles.card}>{children}</div>);
};

export default Card;
