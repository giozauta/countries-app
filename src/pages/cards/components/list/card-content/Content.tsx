import styles from './content.module.css';


 const Content:React.FC<{country:{countryName:string,capitalCity:string,population:number,id:string,vote:number}}> = ({country}) => {
  return (
    <div className={styles.cardContent}>
      <p>Country Name: {country.countryName}</p>
      <p>Capital City: {country.capitalCity}</p>
      <p>Population: {country.population} million</p>
    </div>
  )
}

export default Content;