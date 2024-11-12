import { useEffect, useRef, useState} from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import CardImage from "../card-image";
import CardContent from "../card-content";
import CardInteractSection from "../card-interact-section/CardInteractSection";
import CardAddForm from "../card-add-formSection";
import CardEditForm from "../card-edit-form/CardEditForm";
import ShowEditButton from "../show-editForm-button/ShowEditButton";
import {
  // getCountries,
  fetchPage,
  updateCountry,
  addCountry,
  deleteCountry,
  updateCountryVote,
} from "@/api/countries/index";
import { useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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

 
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["countries", sortOrder],
    queryFn: ({ pageParam }) => fetchPage({page:pageParam,limit:20,sort:sortOrder}),
    getNextPageParam: (lastPage, allPages) => {
      // Assuming lastPage has a length, we check if there’s more data
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    
  })
  //გვჭირდება რომ columnVirtualizer ში count ში მივუთითოთ ზომა 
  const allCountries =  data ? data.pages.flatMap((d) => d) : [];
  // როდესაც countries დავმაფავთ აიდები რომ სწორად გადავცეთ 
  const allIds = allCountries.map((c) => c.id).toString(); // 
  //
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: hasNextPage ? allCountries.length + 1 : allCountries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 410, // Estimated width of each card
    overscan: 5,
  });
  //columnVirtualizer ფუნქცია რომელსაც  მოაქვს  ქვეყნების სია 
  const countries = columnVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastCountry =countries.at(-1);
    if (!lastCountry) {
      return;
    }
    if (lastCountry.index >= allCountries.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allCountries.length, isFetchingNextPage, countries]);


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
    const oldData = allCountries?.find((country) => country.id === updatedData.id);
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
    const country = allCountries?.find((country) => country.id === id);
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
      setNewId(allCountries?.length + 1);
    } else {
      setNewId(1);
    }
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
          {data?.pages &&
           countries.map((virtualColumn) => {
           
              const country = allCountries[virtualColumn.index];
          
            if(!country) {return}
              return (
                <div
                  key={virtualColumn.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${virtualColumn.start + virtualColumn.index}px`,
                    width: "410px",
                    height: "605px",
                    
                  }}
                >
                 

                  <Card id={allIds} deleteStatus={country}>
                    <CardImage id={allIds} />
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
                    {showEditForm === allIds && (
                      <CardEditForm
                        id={allIds}
                        onEditSubmit={handleUpdateCountry}
                      />
                    )}
                    <ShowEditButton
                      id={allIds}
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