import styles from './content.module.css';

 const Content:React.FC<{country:{name:string,capitalCity:string,population:number}}> = ({country}) => {
  return (
    <div className={styles.cardContent}>
      <p>Country Name: {country.name}</p>
      <p>Capital City: {country.capitalCity}</p>
      <p>Population: {country.population} million</p>
      <div className={styles.interactSection}>
        <div className={styles.readMoreBtn}>
          <h3>Read more</h3>
        </div>
        <img className={styles.likeIcon} src="./icons/like.png"/>
      </div>
    </div>
  )
}

export default Content;