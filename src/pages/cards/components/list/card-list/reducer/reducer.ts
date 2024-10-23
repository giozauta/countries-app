//types
  type LanguageString = {
    en: string;
    ka: string;
  };

  type cardsReducerInitialState = {
    imageSrc: string;
    countryName: LanguageString;
    capitalCity: LanguageString;
    population: number;
    article: object;
    id: string;
    vote: number;
    deleteStatus: boolean;
  };
//Reducer component 
export const cardsReducer = (
  countriesList: cardsReducerInitialState[],
  action:any
) => {


//
  if(action.type ==="upvote"){ 
    const [...currentList] = countriesList.map(country => {
      return country.id === action.payload.id
        ? {...country, vote:country.vote+1}
        : {...country};
      });
    return currentList;
  }
//
  if(action.type ==="sort"){
    const sortType = action.payload.sortType;
    const sortedCountries = [...countriesList];
      return sortType==="asc"
        ?sortedCountries.sort((a, b) => a.vote - b.vote)
        :sortedCountries.sort((a, b) => b.vote - a.vote);
  }
//
  if (action.type === "create") {

//ამის დახმარებით ვანახლებთ ახალ countriesList ებს და ვაბრუნებთ 
    const updatedCountriesList = [
        ...countriesList,
        {
          countryName:{
            en:action.payload.cardObject.countryNameEn,
            ka:action.payload.cardObject.countryNameKa
          },
          capitalCity:{
            en:action.payload.cardObject.capitalCityEn,
            ka:action.payload.cardObject.capitalCityKa
          },
          article:{
            en:action.payload.cardObject.articleEn,
            ka:action.payload.cardObject.articleKa
          },
          population:action.payload.cardObject.population,
          imgSrc:action.payload.cardObject.imgSrc,
          vote: 0,
          id:(countriesList.length+1).toString(),
          deleteStatus: false
        }       
    ];
    console.log(updatedCountriesList)
    return updatedCountriesList;
  }
//
  if (action.type === "restore") {
    return [...countriesList].map((country) => {
      return country.id === action.payload.id
        ? { ...country, deleteStatus: false }
        : { ...country };
    });
  }
//
  if(action.type==="delete"){
    return [...countriesList].map((country) => {
      return country.id === action.payload.id
        ?{...country,deleteStatus:true}
        :{...country}
    })
  }

return countriesList;

}