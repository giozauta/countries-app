import styles from './content.module.css';
import {Link} from 'react-router-dom';
 const Content:React.FC<{country:{name:string,capitalCity:string,population:number,id:string,vote:number};handleCountriesVote:(id:string) => void}> = ({country,handleCountriesVote}) => {
  return (
    <div className={styles.cardContent}>
      <p>Country Name: {country.name}</p>
      <p>Capital City: {country.capitalCity}</p>
      <p>Population: {country.population} million</p>
      <div className={styles.interactSection}>
        <Link to={`/cards/${country.id}`} className={styles.readMoreBtn}>
          <h3>Read more</h3>
        </Link>
        <div className={styles.voteSection}>
          <img onClick={()=>handleCountriesVote(country.id)} className={styles.likeIcon} src="./icons/like.png"/>
          <p>{country.vote}</p>
        </div>
      </div>
    </div>
  )
}

export default Content;