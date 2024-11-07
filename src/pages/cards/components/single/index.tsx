import styles from "./singleCard.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {getCountries} from "@/api/countries";

const SingleCard: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang === "ka" ? "ka" : "en";
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

 const country = data?.find((item) => item.id === id);
 if(!country){
  return<div>...loading</div>
 }
  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <img
          src={country.imgSrc}
          alt={country.countryName.en}
          className={styles.singleCardImage}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{country.countryName[currentLang]}</h2>
        <p className={styles.description}>{country.article[currentLang]}</p>
      </div>
    </div>
  );
};

export default SingleCard;
