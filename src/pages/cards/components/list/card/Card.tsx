import styles from './card.module.css';
import React, { PropsWithChildren } from 'react';
import {Link} from 'react-router-dom';

const Card: React.FC<PropsWithChildren<{id:string}>> = ({ children,id }) => {
  return (
    <Link to={`/cards/${id}`} className={styles.cardLink}>
      <div className={styles.card}>{children}</div>
    </Link>
  );
};

export default Card;
