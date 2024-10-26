import { useReducer, useState } from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import CardImage from "../card-image";
import CardContent from "../card-content";
import CardInteractSection from "../card-interact-section/CardInteractSection";
import cardsInitialState from "./reducer/state";
import CardAddForm from "../card-add-formSection";
import { cardsReducer } from "./reducer/reducer";
import { useParams } from "react-router-dom";

const CardList: React.FC = () => {
  const [formSection, setFormSection] = useState(false); //ფორმის პანელის გამოსაჩენად გვჭირდება
  const [countries, dispatch] = useReducer(cardsReducer, cardsInitialState);

  const { lang } = useParams();
  const currentLang = lang ?? "en";

  const sortCountries = [...countries].sort(
    (a, b) => Number(a.deleteStatus) - Number(b.deleteStatus),
  );

  //ფუნქცია რომელსაც ვიყენებთ ლაიქების დასაწერად
  const handleCountriesVote = (id: string) => {
    dispatch({
      type: "upvote",
      payload: {
        id,
      },
    });
  };

  //ფუნქცია რომელსაც ფიყენებთ ლაიქების მიხედვით card ების დასალაგებლად
  const handleSortChange = (sortType: "asc" | "desc") => {
    dispatch({
      type: "sort",
      payload: {
        sortType,
      },
    });
  };

  //ფუნქციის დახმარებით ვამატებთ ახალ cards ებს
  const handleCreateCard = (newCardData: {
    countryNameEn: string;
    countryNameKa: string;
    capitalCityEn: string;
    capitalCityKa: string;
    population: number;
    imgSrc: string;
  }) => {
    const cardObject = { ...newCardData };
    dispatch({
      type: "create",
      payload: {
        cardObject,
        currentLang,
      },
    });
  };
  //ფუნქციის დახმარებით აღვადგენთ გამქრალ ქარდს
  const handleCardRestore = (id: string) => {
    dispatch({
      type: "restore",
      payload: {
        id,
      },
    });
  };
  //ფუნქციის დახმარებით წავშლით ქარდს
  const handleDeleteCard = (id: string) => {
    dispatch({
      type: "delete",
      payload: {
        id,
      },
    });
  };

  return (
    <section className={styles.cardListSection}>
      <div className={styles.cardButtonSection}>
        <button
          onClick={() => handleSortChange("asc")}
          className={styles.sortButton}
        >
          {currentLang === "en" ? "Asc" : "ზრდადი"}
        </button>
        <button
          onClick={() => handleSortChange("desc")}
          className={styles.sortButton}
        >
          {currentLang === "en" ? "Desc" : "კლებადი"}
        </button>
        <button
          className={styles.addCardButton}
          onClick={() =>
            setFormSection((prevState) => {
              return !prevState;
            })
          }
        >
          {currentLang === "en" ? "Add Card" : "დამატება"}
        </button>
        {formSection ? <CardAddForm onCardCreate={handleCreateCard} /> : null}
      </div>
      <div className={styles.CardsBox}>
        {sortCountries.map((country) => (
          <Card
            handleCardRestore={handleCardRestore}
            id={country.id}
            deleteStatus={country.deleteStatus}
            key={country.id}
          >
            <CardImage imgSrc={country.imgSrc} />
            <CardContent country={country} />
            <CardInteractSection
              handleDeleteCard={handleDeleteCard}
              country={country}
              handleCountriesVote={handleCountriesVote}
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CardList;
