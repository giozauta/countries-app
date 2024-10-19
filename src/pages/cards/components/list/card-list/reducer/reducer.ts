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
//
  if(action.type ==="upvote"){ 
      const updatedCountriesList = countriesList.map(country => {
        return country.id === action.payload.id
        ? {...country, vote:country.vote+1}
        : {...country};
      });
  
      return updatedCountriesList;

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
    const updatedCountriesList = [
      ...countriesList,
        {
          ...action.payload.cardObject,
          imgSrc:"/images/random.jpg",
          vote: 0,
          id: (Number(countriesList.at(-1)?.id) + 1).toString(),
          deleteStatus: false
        }       
    ];
    return updatedCountriesList;
  }
//
  if (action.type === "restore") {
    return countriesList.map((country) => {
      return country.id === action.payload.id
        ? { ...country, deleteStatus: false }
        : { ...country };
    });
  }
//
  if(action.type==="delete"){
    return countriesList.map((country) => {
      return country.id === action.payload.id
        ?{...country,deleteStatus:true}
        :{...country}
    })
  }



return countriesList;

}