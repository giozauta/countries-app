
import styles from './singleCard.module.css';

const SingleCard:React.FC<{data:{name:string,imgSrc:string,article:string}}>= ({data}) => {
  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <img src={data.imgSrc} alt={data.name} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{data.name}</h2>
        <p className={styles.description}>{data.article}</p>
      </div>
    </div>
  )
}

export default SingleCard;