import styles from  './aboutViews.module.css';

const AboutViews:React.FC = ()=> {
  return (
    <div className={styles.aboutViewsBox}>
      <div>
        <img 
            src="icons/developer.png" 
            alt="Developer icon" 
            width={450} 
            height={400} 
        />
      </div>
        <div className={styles.aboutViewsBoxContent}>
            <h2>Project Name :</h2> Countries App
            <h2>Author :</h2> Giorgi Zautashvili
            <h2>description :</h2> This is TBC project, i need to create A countries app that allows you to search for countries and get more information about them.
        </div>
    </div>
  )
}

export default AboutViews;