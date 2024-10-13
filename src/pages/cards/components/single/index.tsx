import styles from './singleCard.module.css';

type SingleCardProps = {
  cardData: {
    countryName: string;
    capitalCity: string;
    population: number;
    article: string;
    imgSrc: string;
    id: string;
    vote: number;
    deleteStatus: boolean;
  };
};

const SingleCard: React.FC<SingleCardProps> = ({ cardData }) => {
  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <img src={cardData.imgSrc} alt={cardData.countryName} className={styles.singleCardImage} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{cardData.countryName}</h2>
        <p className={styles.description}>{cardData.article}</p>
      </div>
    </div>
  );
};

export default SingleCard;
