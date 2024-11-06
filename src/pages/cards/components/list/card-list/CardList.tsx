import { useState } from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import CardImage from "../card-image";
import CardContent from "../card-content";
import CardInteractSection from "../card-interact-section/CardInteractSection";
import CardAddForm from "../card-add-formSection";
import CardEditForm from "../card-edit-form/CardEditForm";
import ShowEditButton from "../show-editForm-button/ShowEditButton";
import { getCountries,updateCountry,addCountry,deleteCountry ,updateCountryVote} from "@/api/countries/index";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";



type NewCardData = {
  countryNameEn: string;
  countryNameKa: string;
  capitalCityEn: string;
  capitalCityKa: string;
  population: number;
  imgSrc: string;
};

type EditCardData = {
  id: string;
  countryNameEn: string;
  countryNameKa: string;
  capitalCityEn: string;
  capitalCityKa: string;
  population: number;
  imgSrc: string;
};
const CardList: React.FC = () => {
  const [formSection, setFormSection] = useState(false); //card-ის დასამატებელი ფორმის პანელის გამოსაჩენად გვჭირდება
  const [showEditForm, setShowEditForm] = useState<string | null>(null); // card - ის დასაედიტებელი ფორმის გამოსაჩენად გვჭირდება

  const { lang } = useParams();
  const currentLang = lang ?? "en";

  const { data,isLoading,isError,refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries
  });

  const { mutate:mutateCountry,isPending:isMutateLoading } = useMutation({
    mutationFn: updateCountry,
    onSuccess: () => refetch(),
  });


  const { mutate : mutateVote } = useMutation({
    mutationFn: updateCountryVote,
    onSuccess: () => refetch(),
  });

  const {mutate:addCountryMutate} = useMutation({
    mutationFn:addCountry,
    onSuccess:()=>refetch(),
  })

  const {mutate:deleteCountryMutate} = useMutation({
    mutationFn:deleteCountry,
    onSuccess:()=>refetch(),
  })


  //for opening edit form
  const handleShowEditForm = (id: string) => {
    setShowEditForm((prev) => (prev === id ? null : id)); // Toggle the ID
  };

  // const handleSortChange = (sortType: "asc" | "desc") => {
  //   const sortedCountries = [...data]?.sort((a, b) =>
  //     sortType === "asc" ? a.vote - b.vote : b.vote - a.vote,
  //   )
  // };

  const handleUpdateCountry = (updatedData: EditCardData) => {
    const idToNumber = Number(updatedData.id);
    const oldData = data?.[idToNumber-1];
    if(!oldData)return;
    const newData = {
      id: updatedData.id,
      countryName: {
        en:
          updatedData.countryNameEn !== ""
            ? updatedData.countryNameEn
            : oldData.countryName.en,
        ka:
          updatedData.countryNameKa !== ""
            ? updatedData.countryNameKa
            : oldData.countryName.ka,
      },
      capitalCity: {
        en:
          updatedData.capitalCityEn !== ""
            ? updatedData.capitalCityEn
            : oldData.capitalCity.en,
        ka:
          updatedData.capitalCityKa !== ""
            ? updatedData.capitalCityKa
            : oldData.capitalCity.ka,
      },
      population: updatedData.population !== 0 ? updatedData.population : oldData.population,
      imgSrc: updatedData.imgSrc !== "" ? updatedData.imgSrc : oldData.imgSrc,
      article: {
        en: "New Article",
        ka: "ახალი ტექსტი",
      },
      vote: oldData.vote,
      deleteStatus: false,
    };

    if (Number(updatedData.id) > 6) {
      mutateCountry({id:updatedData.id,payload:newData});
      setShowEditForm((prev) =>
        prev === updatedData.id ? null : updatedData.id,
      ); //იმისთვის რომ ფორმის საბმითზე ფორმა გაგვიქროს
    }
    if (Number(updatedData.id) <= 6) {
      if (currentLang == "en") {
        alert("Cant change default card");
      } else {
        alert("Default ბარათის შეცვლა დროებით არ შეიძლება");
      }
    }
  };
  
  const handleCountriesVote = (id: string) => {
    const country = data?.find((country) => country.id === id);
    if (!country) {
      console.error(`Country with id ${id} not found.`);
      return;
    }
    const newVote = country.vote + 1;
    mutateVote({ id: country.id, payload: { vote: newVote } });
  };
  
  



  const handleDeleteCard = (id: string) => {
    if (Number(id) > 6) {
      // ეს კოდი უბრალოდ იმისთვის რომ წინასწარ ჩაწერილი მონაცემები რომ არ წამიშალოს და ვიზუალი არ დაამახინჯოს
      deleteCountryMutate(id);
    }
    if (Number(id) <= 6) {
      if (currentLang == "en") {
        alert("Cant Delete default card");
      } else {
        alert("Default ბარათის წაშლა დროებით არ შეიძლება");
      }
    }
  };

  const handleCreateCard = (newCardData: NewCardData) => {
    const newId = String(data?.length? + 1:1);
    const newCountry = {
      countryName: {
        en: newCardData.countryNameEn,
        ka: newCardData.countryNameKa,
      },
      capitalCity: {
        en: newCardData.capitalCityEn,
        ka: newCardData.capitalCityKa,
      },
      population: newCardData.population,
      imgSrc: newCardData.imgSrc,
      id: newId,
      article: {
        en: "Default article",
        ka: "არტიკლის ტექსტი",
      },
      vote: 0,
      deleteStatus: false,
    };
    addCountryMutate({payload:newCountry});
  };


if(!isError){
  return (
    <section className={styles.cardListSection}>
      <div className={styles.cardButtonSection}>
        <button
          // onClick={() => handleSortChange("asc")}
          className={styles.sortButton}
        >
          {currentLang === "en" ? "Asc" : "ზრდადი"}
        </button>
        <button
          // onClick={() => handleSortChange("desc")}
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
      <div className={styles.cardsBox}>
        {isLoading
        ?<div>Loading...</div>
        :data?.map((country) => (
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
            {showEditForm === country.id && (
              <CardEditForm  id={country.id} onEditSubmit={handleUpdateCountry} />
            )}
            <ShowEditButton
              id={country.id}
              onSHowEditButtonClick={handleShowEditForm}
              isMutateLoading={isMutateLoading}
            />
          </Card>))        
        }
      </div>
    </section>
  );
} else {
  return <div>Error</div>;
}

};

export default CardList;
