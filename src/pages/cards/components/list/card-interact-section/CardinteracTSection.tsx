import React from 'react'
import { Link } from 'react-router-dom';
import styles from './cardInteractSection.module.css';

const CardinteractSection:React.FC<{country:{name:string,capitalCity:string,population:number,id:string,vote:number};handleCountriesVote:(id:string) => void}> = ({country,handleCountriesVote}) => {
  return (
    <div className={styles.interactSection}>
        <Link to={`/cards/${country.id}`} className={styles.readMoreBtn}>
            <h3>Read more</h3>
        </Link>
        <div className={styles.voteSection}>
            <img onClick={()=>handleCountriesVote(country.id)} className={styles.likeIcon} src="./icons/like.png"/>
            <p>{country.vote}</p>
        </div>
    </div>
  )
}

export default CardinteractSection;
