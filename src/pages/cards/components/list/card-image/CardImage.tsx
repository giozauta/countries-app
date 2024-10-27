import styles from "./cardImage.module.css";
import { useState } from "react";

const CardImage: React.FC<{ imgSrc: string }> = ({ imgSrc }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleShowContent = () => {
    setIsContentVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <div className={styles.cardImageBox}>
      <img
        alt="card"
        className={isContentVisible ? styles.cardImage : styles.cardImageOver}
        src={imgSrc}
      />
      <div onClick={handleShowContent} className={styles.clickMe}>
        Click Me
      </div>
    </div>
  );
};

export default CardImage;
