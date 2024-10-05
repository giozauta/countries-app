import styles from './cardImage.module.css';

const CardImage: React.FC<{ imgSrc: string }> = ({imgSrc}) => {
    return (
        <div className={styles.cardImageBox}>
            <img className={styles.cardImage} src={imgSrc}/>
        </div>
    );
};

export default CardImage;
