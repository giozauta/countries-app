import styles from './hero.module.css';

 const  Hero:React.FC = () => {
  return (
    <div className={styles.hero}>
        <div className={styles.heroContent}>
            <p>
                A country is a distinct territory with
                defined borders, boundaries, people and government
            </p>
        </div>
    </div>
  )
}

export default Hero;