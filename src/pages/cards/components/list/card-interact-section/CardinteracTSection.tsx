import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './cardInteractSection.module.css';

type CardinteractSectionProps = {
  country:{name:string,capitalCity:string,population:number,id:string,vote:number,deleteStatus:boolean},
  handleCountriesVote:(id:string) => void,
  handleDeleteCard:(id:string,lang:string) => void
}

const CardinteractSection:React.FC<CardinteractSectionProps> = ({country,handleCountriesVote,handleDeleteCard}) => {
  const {lang} = useParams();
  const currentLang = lang||'en';

  return (
    <div className={country.deleteStatus?styles.cardButtonSectionDisabled:styles.cardButtonSectionActive}>
      <div className={styles.cardButtonSectionOne}>
        <Link to={`${country.id}`} className={styles.readMoreBtn}>
            {currentLang==="en"&&<h3>Read more</h3>}
            {currentLang==="ka"&&<h3>მეტის ნახვა</h3>}
        </Link>
      </div>
      <div className={styles.cardButtonSectionTwo}>
        <div className={styles.voteSection}>
            <img onClick={()=>handleCountriesVote(country.id)} className={styles.likeIcon} src="/icons/like.png"/>
            <p>{country.vote}</p> 
        </div>
          <p onClick={()=>handleDeleteCard(country.id,currentLang)} className={styles.cardDeleteButton}>X</p>
      </div>
    </div>
  )
}

export default CardinteractSection;
