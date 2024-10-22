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
  
//ეს გვჭირდება იმისთვის რომ, თუ ქართულ ენაზე ჩაწერს საიტზე ქართულად user ი ka: ში ჩავარდება ტექსტი 
      let currentLangCountryName;
      let currentLangCapitalCity;
      let currentLangArticle;

      if(action.payload.currentLang==="ka"){
          currentLangCountryName ={
            en:"",
            ka:action.payload.cardObject.countryName
          }
          currentLangCapitalCity={
            en:"",
            ka:action.payload.cardObject.capitalCity
          }
          currentLangArticle={
            en:"",
            ka:action.payload.cardObject.article
          }
      }
      if(action.payload.currentLang==="en"){
          currentLangCountryName ={
            en:action.payload.cardObject.countryName,
            ka:""
          }
          currentLangCapitalCity={
            en:action.payload.cardObject.capitalCity,
            ka:""
          }
          currentLangArticle={
            en:action.payload.cardObject.article,
            ka:""
          }
      }
//ამის დახმარებით ვანახლებთ ახალ countriesList ებს და ვაბრუნებთ 
    const updatedCountriesList = [
        ...countriesList,
        {
          countryName:{
            ...currentLangCountryName
          },
          capitalCity:{
            ...currentLangCapitalCity
          },
          article:{
            ...currentLangArticle
          },
          population:action.payload.cardObject.population,
          imgSrc:action.payload.cardObject.imgSrc,
          vote: 0,
          id: (Number(countriesList.at(-1)?.id) + 1).toString(),
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