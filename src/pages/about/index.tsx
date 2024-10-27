import styles from "./aboutViews.module.css";
import { useParams } from "react-router-dom";

type ContentType = {
  [key: string]: {
    title: string;
    projectName: string;
    author: string;
    authorName: string;
    descriptionWord: string;
    description: string;
  };
};

const AboutViews: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? "en";

  const content: ContentType = {
    en: {
      title: "Project Name",
      projectName: "Countries App",
      author: "Author",
      authorName: "Giorgi Zautashvili",
      descriptionWord: "Description",
      description:
        "This is TBC project, I need to create a countries app that allows you to search for countries and get more information about them.",
    },
    ka: {
      title: "პროექტის დასახელება",
      projectName: "ქვეყნების აპლიკაცია",
      author: "ავტორი",
      authorName: "გიორგი ზაუტაშვილი",
      descriptionWord: "აღწერა",
      description:
        "ეს არის თიბისი პროექტი, მე უნდა შევქმნა საიტი ქვეყანა, რომელიც საშუალებას მოგცემთ მოძებნოთ ქვეყნები და მიიღოთ მეტი ინფორმაცია მათ შესახებ.",
    },
  };

  return (
    <div className={styles.aboutViewsBox}>
      <div className={styles.aboutViewsBoxImage}>
        <img
          src="/icons/developer.png"
          alt="Developer icon"
          width={450}
          height={400}
        />
      </div>
      <div className={styles.aboutViewsBoxContent}>
        <h2>{content[currentLang].title}</h2> {content[currentLang].projectName}
        <h2>{content[currentLang].author}</h2> {content[currentLang].authorName}
        <h2>{content[currentLang].descriptionWord}</h2>{" "}
        {content[currentLang].description}
      </div>
    </div>
  );
};

export default AboutViews;
