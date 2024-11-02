//types
type LanguageString = {
  en: string;
  ka: string;
};

type CardObjectType = {
  countryNameEn: string;
  countryNameKa: string;
  capitalCityEn: string;
  capitalCityKa: string;
  population: number;
  imgSrc: string;
};
type ActionType =
  | { type: "upvote"; payload: { id: string } }
  | { type: "sort"; payload: { sortType: "asc" | "desc" } }
  | {
      type: "create";
      payload: { cardObject: CardObjectType; currentLang: string };
    }
  | { type: "restore"; payload: { id: string } }
  | { type: "delete"; payload: { id: string } };

type CardsReducerInitialState = {
  imgSrc: string;
  countryName: LanguageString;
  capitalCity: LanguageString;
  population: number;
  article: LanguageString;
  id: string;
  vote: number;
  deleteStatus: boolean;
};
//Reducer component
export const cardsReducer = (
  countriesList: CardsReducerInitialState[],
  action: ActionType,
) => {
  //
  if (action.type === "upvote") {
    const [...currentList] = countriesList.map((country) => {
      return country.id === action.payload.id
        ? { ...country, vote: country.vote + 1 }
        : { ...country };
    });
    return currentList;
  }
  //
  if (action.type === "sort") {
    const sortType = action.payload.sortType;
    const sortedCountries = [...countriesList];
    return sortType === "asc"
      ? sortedCountries.sort((a, b) => a.vote - b.vote)
      : sortedCountries.sort((a, b) => b.vote - a.vote);
  }

  return countriesList;
};
