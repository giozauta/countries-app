import styles from './content.module.css';

type ContentProps = {
  country:{countryName:string,capitalCity:string,population:number,id:string,vote:number}
}

 const Content:React.FC<ContentProps> = ({country}) => {
  return (
    <div className={styles.cardContent}>
      <p>Country Name: {country.countryName}</p>
      <p>Capital City: {country.capitalCity}</p>
      <p>Population: {country.population} million</p>
    </div>
  )
}

export default Content;