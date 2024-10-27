import { useParams } from "react-router-dom";
import styles from "./content.module.css";

type LanguageString = {
  en: string;
  ka: string;
};
type CountryType = {
  countryName: LanguageString;
  capitalCity: LanguageString;
  population: number;
  article: LanguageString;
  imgSrc: string;
  id: string;
  vote: number;
  deleteStatus: boolean;
};

const Content: React.FC<{ country: CountryType }> = ({ country }) => {
  const { lang } = useParams();
  const currentLang: string = lang ?? "en";

  if (currentLang === "en") {
    return (
      <div className={styles.cardContent}>
        <p>Country Name: {country.countryName[currentLang]}</p>
        <p>Capital City: {country.capitalCity[currentLang]}</p>
        <p>Population: {country.population} million</p>
      </div>
    );
  }
  if (currentLang === "ka") {
    return (
      <div className={styles.cardContent}>
        <p>ქვეყანა: {country.countryName[currentLang]}</p>
        <p>დედაქალაქი: {country.capitalCity[currentLang]}</p>
        <p>მოსახლეობა: {country.population} მილიონი</p>
      </div>
    );
  }
};

export default Content;
