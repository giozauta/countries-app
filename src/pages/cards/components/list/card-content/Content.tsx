import { useParams } from 'react-router-dom';
import styles from './content.module.css';

type ContentProps = {
  country:{countryName:string,capitalCity:string,population:number,id:string,vote:number}
}

 const Content:React.FC<ContentProps> = ({country}) => {
  const {lang} = useParams();
  const currentLang = lang||'en';

  if(currentLang==="en"){
    return (
      <div className={styles.cardContent}>
        <p>Country Name: {country.countryName[currentLang]}</p>
        <p>Capital City: {country.capitalCity[currentLang]}</p>
        <p>Population: {country.population} million</p>
      </div>
    )
  }
  if(currentLang==="ka"){
    return (
      <div className={styles.cardContent}>
        <p>ქვეყანა: {country.countryName[currentLang]}</p>
        <p>დედაქალაქი: {country.capitalCity[currentLang]}</p>
        <p>მოსახლეობა: {country.population} მილიონი</p>
      </div>
    )
  }

}

export default Content;