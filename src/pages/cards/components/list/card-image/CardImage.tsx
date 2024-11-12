import styles from "./cardImage.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { singleCountry } from "@/api/countries";
import { useQuery } from "@tanstack/react-query";

const CardImage: React.FC<{ id: string }> = ({ id }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const { lang } = useParams();
  const currentLang = lang ?? "en";

  const { data } = useQuery({
    queryKey: ["countryImg",id],
    queryFn: () => singleCountry(id),
  });

  const handleShowContent = () => {
    setIsContentVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <div className={styles.cardImageBox}>
      <img
        alt="card"
        className={isContentVisible ? styles.cardImage : styles.cardImageOver}
        src={data?.imgSrc}
      />
      <div onClick={handleShowContent} className={styles.clickMe}>
        {currentLang === "en" ? "Click Me" : "დამკლიკე"}
      </div>
    </div>
  );
};

export default CardImage;
