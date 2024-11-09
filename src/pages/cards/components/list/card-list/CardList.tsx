import { useRef, useState } from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import CardImage from "../card-image";
import CardContent from "../card-content";
import CardInteractSection from "../card-interact-section/CardInteractSection";
import CardAddForm from "../card-add-formSection";
import CardEditForm from "../card-edit-form/CardEditForm";
import ShowEditButton from "../show-editForm-button/ShowEditButton";
import {
  getCountries,
  updateCountry,
  addCountry,
  deleteCountry,
  updateCountryVote,
} from "@/api/countries/index";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
// import { useVirtualizer } from "@tanstack/react-virtual";

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
  const [newId, setNewId] = useState(7); //ახალი ქვეყნის აიდი
  const { lang } = useParams();
  const currentLang = lang ?? "en";
  //იმისთვის რომ შევინახოთ სორტირება გვერდის დარეფრეშების დროს
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") ?? "asc";
  //ვირტუალიზაციისთვის
  const parentRef = useRef(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["countries", sortOrder],
    queryFn: () => getCountries(sortOrder),
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: data ? data.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 10,
  });
  console.log(columnVirtualizer.getVirtualItems());
  const {
    mutate: mutateCountry,
    isPending: isCountryLoading,
    isError: isCountryError,
    error: countryError,
  } = useMutation({
    mutationFn: updateCountry,
    onSuccess: () => refetch(),
  });

  const {
    mutate: mutateVote,
    isPending: isVoteLoading,
    isError: isVoteError,
  } = useMutation({
    mutationFn: updateCountryVote,
    onSuccess: () => refetch(),
  });

  const {
    mutate: createCountryMutate,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useMutation({
    mutationFn: addCountry,
    onSuccess: () => refetch(),
  });

  const {
    mutate: deleteCountryMutate,
    isPending: isDeleteLoading,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => refetch(),
  });

  //for opening edit form
  const handleShowEditForm = (id: string) => {
    setShowEditForm((prev) => (prev === id ? null : id));
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSearchParams({ sort: order });
  };

  const handleUpdateCountry = (updatedData: EditCardData) => {
    const oldData = data?.find((country) => country.id === updatedData.id);

    if (!oldData) return;
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
      population:
        updatedData.population !== 0
          ? updatedData.population
          : oldData.population,
      imgSrc: updatedData.imgSrc !== "" ? updatedData.imgSrc : oldData.imgSrc,
      article: {
        en: "New Article",
        ka: "ახალი ტექსტი",
      },
      vote: oldData.vote,
      deleteStatus: false,
    };

    if (Number(updatedData.id) > 6) {
      mutateCountry({ id: updatedData.id, payload: newData });
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
    const newCountryId = newId.toString();

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
      id: newCountryId,
      article: {
        en: "Default article",
        ka: "არტიკლის ტექსტი",
      },
      vote: 0,
      deleteStatus: false,
    };
    createCountryMutate({ payload: newCountry });
    setNewId((pref) => pref + 1);
  };

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

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
          onClick={() => setFormSection(!formSection)}
        >
          {currentLang === "en" ? "Add Card" : "დამატება"}
        </button>
        {formSection && (
          <CardAddForm
            isCreateError={isCreateError}
            isCreateLoading={isCreateLoading}
            onCardCreate={handleCreateCard}
          />
        )}
      </div>
      <div ref={parentRef} className={styles.cardsBox}>
        {data &&
          columnVirtualizer.getVirtualItems().map((virtualRow) => {
            const country = data[virtualRow.index];
            return (
              <div
                key={country.id}
                style={{
                  left: `${virtualRow.start}px`, // Horizontal positioning with translateX
                  width: "410px", // Width of each card (adjust as needed)
                  height: "605px",
                }}
              >
                <Card
                  id={country.id}
                  deleteStatus={country.deleteStatus}
                  key={country.id}
                >
                  <CardImage imgSrc={country.imgSrc} />
                  <CardContent country={country} />
                  <CardInteractSection
                    isVoteLoading={isVoteLoading}
                    isVoteError={isVoteError}
                    isDeleteLoading={isDeleteLoading}
                    isDeleteError={isDeleteError}
                    handleDeleteCard={handleDeleteCard}
                    country={country}
                    handleCountriesVote={handleCountriesVote}
                  />
                  {showEditForm === country.id && (
                    <CardEditForm
                      id={country.id}
                      onEditSubmit={handleUpdateCountry}
                    />
                  )}
                  <ShowEditButton
                    id={country.id}
                    onSHowEditButtonClick={handleShowEditForm}
                    isMutateLoading={isCountryLoading}
                    isCountryError={isCountryError}
                    countryError={countryError ? countryError.message : ""}
                  />
                </Card>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default CardList;
