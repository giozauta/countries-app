import styles from "./cardImage.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
const CardImage: React.FC<{ imgSrc: string }> = ({ imgSrc }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const { lang } = useParams();
  const currentLang = lang ?? "en";

  const handleShowContent = () => {
    setIsContentVisible((prev) => !prev); // Toggle visibility
  };

  console.log(imgSrc);
  return (
    <div className={styles.cardImageBox}>
      <img
        alt="card"
        className={isContentVisible ? styles.cardImage : styles.cardImageOver}
        src={`/images/${imgSrc}`}
      />
      <div onClick={handleShowContent} className={styles.clickMe}>
        {currentLang === "en" ? "Click Me" : "დამკლიკე"}
      </div>
    </div>
  );
};

export default CardImage;
