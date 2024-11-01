import { useState,useEffect} from "react";
import axios from "axios";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import CardImage from "../card-image";
import CardContent from "../card-content";
import CardInteractSection from "../card-interact-section/CardInteractSection";
import CardAddForm from "../card-add-formSection";
import CardEditForm from "../card-edit-form/CardEditForm";
import ShowEditButton from "../show-editForm-button/ShowEditButton";
import { useParams } from "react-router-dom";


type Country = {
  countryName: {
      en: string;
      ka: string;
  };
  capitalCity: {
      en: string;
      ka: string;
  };
  population: number;
  article: {
      en: string;
      ka: string;
  };
  imgSrc: string;
  id: string; // or number, depending on your preference
  vote: number;
  deleteStatus: boolean;
};

type NewCardData = {
  countryNameEn: string;
  countryNameKa: string;
  capitalCityEn: string;
  capitalCityKa: string;
  population: number;
  imgSrc: string;
}
const CardList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false); // როდესაც მონაცემები წაიშლება ან დაემატება მოხდება ცვლილება სთეითის და კომპონენტი დარენდერდება 
  const [formSection, setFormSection] = useState(false); //card-ის დასამატებელი ფორმის პანელის გამოსაჩენად გვჭირდება
  const [showEditForm, setShowEditForm] = useState<string | null>(null);// card - ის დასაედიტებელი ფორმის გამოსაჩენად გვჭირდება 

  const { lang } = useParams();
  const currentLang = lang ?? "en";

  useEffect(() => {
    axios.get("http://localhost:3000/countries")
    .then((res) => {
       setCountries(res.data);
    })
    .catch((error) => {
        console.error("Error", error); 
    })
    .finally(() => {
        
    })
},[deleteTrigger]);

  const sortCountries = [...countries].sort(
    (a, b) => Number(a.deleteStatus) - Number(b.deleteStatus),
  );


//for opening edit form
const handleShowEditForm = (id: string) => {
  setShowEditForm((prev) => (prev === id ? null : id)); // Toggle the ID
};


  const handleSortChange = (sortType: "asc" | "desc") => {//დროებით 
    console.log(sortType);
  };
  const handleCountriesVote = (id: string) => {//დროებით
    console.log(id);
  };


  const handleDeleteCard = (id: string) => {
    if(Number(id)>6) { // ეს კოდი უბრალოდ იმისთვის რომ წინასწარ ჩაწერილი მონაცემები რომ არ წამიშალოს და ვიზუალი არ დაამახინჯოს 
        axios.delete(`http://localhost:3000/countries/${id}`)
        .then(() => {
            setDeleteTrigger(!deleteTrigger);
        })
        .catch((error) => {
            console.error("Error", error);
        });
    }

};


const handleCreateCard = (newCardData: NewCardData) => {
    const data = {
        countryName: {
            en: newCardData.countryNameEn,
            ka: newCardData.countryNameKa
        },
        capitalCity: {
            en: newCardData.capitalCityEn,
            ka: newCardData.capitalCityKa
        },
        population: newCardData.population,
        imgSrc: newCardData.imgSrc,
        id: String(countries.length + 1),
        article: "new article",
        vote: 0,
        deleteStatus: false
    };

    axios.post("http://localhost:3000/countries", data)
        .then(()=>{
            setDeleteTrigger(!deleteTrigger);
        })

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
            {showEditForm === country.id && <CardEditForm />}
            <ShowEditButton id={country.id} onSHowEditButtonClick={handleShowEditForm}/>
          </Card>
        ))}
      </div>
      
    </section>
  );
};

export default CardList;
