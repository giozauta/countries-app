import styles from './content.module.css';
 const Content:React.FC<{country:{name:string,capitalCity:string,population:number,id:string,vote:number};handleCountriesVote:(id:string) => void}> = ({country}) => {
  return (
    <div className={styles.cardContent}>
      <p>Country Name: {country.name}</p>
      <p>Capital City: {country.capitalCity}</p>
      <p>Population: {country.population} million</p>
    </div>
  )
}

export default Content;