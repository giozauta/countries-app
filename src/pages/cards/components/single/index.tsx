import styles from "./singleCard.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { singleCountry } from "@/api/countries";

const SingleCard: React.FC = () => {
  const { id, lang } = useParams();
  const currentLang = lang ?? "en";
  const { data, isLoading, error } = useQuery({
    queryKey: ["country", id],
    queryFn: () => singleCountry(id),
  });

  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const country = data;
  if (!country) {
    return <div>...loading</div>;
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
