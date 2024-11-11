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
  const [formSection, setFormSection] = useState(false); //for show form section
  const [showEditForm, setShowEditForm] = useState<string | null>(null);
  const [newId, setNewId] = useState(0);

  //
  const { lang } = useParams();
  const currentLang = lang ?? "en";
  //
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") ?? "asc";
  const parentRef = useRef(null);
  //

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["countries", sortOrder],
    queryFn: () => getCountries(sortOrder),
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 410, // Estimated width of each card
    overscan: 5,
  });

  // console.log("Rendered virtual items:", columnVirtualizer.getVirtualItems());
  // console.log(data);

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
        en: updatedData.countryNameEn || oldData.countryName.en,
        ka: updatedData.countryNameKa || oldData.countryName.ka,
      },
      capitalCity: {
        en: updatedData.capitalCityEn || oldData.capitalCity.en,
        ka: updatedData.capitalCityKa || oldData.capitalCity.ka,
      },
      population: updatedData.population || oldData.population,
      imgSrc: updatedData.imgSrc || oldData.imgSrc,
      article: { en: "New Article", ka: "ახალი ტექსტი" },
      vote: oldData.vote,
      deleteStatus: false,
    };

    mutateCountry({ id: updatedData.id, payload: newData });
    setShowEditForm((prev) =>
      prev === updatedData.id ? null : updatedData.id,
    );
  };

  const handleCountriesVote = (id: string) => {
    const country = data?.find((country) => country.id === id);
    if (!country) {
      console.error(`Country with id ${id} not found.`);
      return;
    }
    mutateVote({ id: country.id, payload: { vote: country.vote + 1 } });
  };

  const handleDeleteCard = (id: string) => {
    deleteCountryMutate(id);
  };

  const handleCreateCard = (newCardData: NewCardData) => {
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
      id: newId.toString(),
      article: { en: "Default article", ka: "არტიკლის ტექსტი" },
      vote: 0,
      deleteStatus: false,
    };

    createCountryMutate({ payload: newCountry });
    if (data) {
      setNewId(data?.length + 1);
    } else {
      setNewId(1);
    }
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
        <div
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {data &&
            columnVirtualizer.getVirtualItems().map((virtualColumn) => {
              const country = data[virtualColumn.index];
              return (
                <div
                  key={country.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${virtualColumn.start}px`,
                    width: "410px",
                    height: "605px",
                  }}
                >
                  <Card id={country.id} deleteStatus={country.deleteStatus}>
                    <CardImage id={country.id} />
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
      </div>
    </section>
  );
};

export default CardList;
