import styles from './card.module.css';
import React, { PropsWithChildren } from 'react';

type CardProps={
  deleteStatus:boolean,
  id:string,
  handleCardRestore:(id:string)=>void
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({children,deleteStatus,handleCardRestore,id}) => {

  if(deleteStatus){
    return (
      <div className={styles.deleteCard}>
        {children}
        <button onClick={()=>handleCardRestore(id)} className={styles.restoreButton}>Restore</button>
      </div>
    );
  }
  return (<div className={styles.card}>{children}</div>);
};

export default Card;
