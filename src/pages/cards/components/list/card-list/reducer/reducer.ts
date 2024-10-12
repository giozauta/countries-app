type cardsReducerInitialState = {
  imageSrc:string;
  countryName:string;
  capitalCity:string;
  population:number;
  article:string;
  id:string;
  vote:number;
  deleteStatus:boolean;
}


export const cardsReducer = (
  countriesList: cardsReducerInitialState[],
  action:any
) => {

  if(action.type ==="upvote"){
    const updatedCountries = countriesList.map(country => {
      if(country.id === action.payload.id){
        return {...country, vote:country.vote+1}
      }
      return {...country};
    });
    return updatedCountries;
  }

  if(action.type ==="sort"){
    const sortType = action.payload.sortType;
    const sortedCountries = [...countriesList];
    if (sortType === "asc") {
        sortedCountries.sort((a, b) => a.vote - b.vote); 
    } else if (sortType === "desc") {
        sortedCountries.sort((a, b) => b.vote - a.vote); 
    }
    return sortedCountries;
  }

  if (action.type === "create") {
    const updatedCountriesList = [
        ...countriesList,
        {
          ...action.payload.cardObject,
          imgSrc:"/images/random.jpg",
          vote: 0,
          id: (Number(countriesList.at(-1)?.id) + 1).toString(),
        }
    ];
    return updatedCountriesList;
  }

  if (action.type === "restore") {
    return countriesList.map((country) => {
      if (country.id === action.payload.id) {
        return { ...country, deleteStatus: false }; // Create a new object with updated deleteStatus
      }
      return {...country};
    });
  }

  if(action.type==="delete"){
    return countriesList.map((country) => {
      if(country.id===action.payload.id){
        return {...country,deleteStatus:true}
      }
      return {...country}
    })
  }

return countriesList

}