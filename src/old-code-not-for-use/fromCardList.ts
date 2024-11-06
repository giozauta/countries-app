/*
  //ფუნქციის დახმარებით ვამატებთ ახალ cards ებს
  const handleCreateCard = (newCardData: {
    countryNameEn: string;
    countryNameKa: string;
    capitalCityEn: string;
    capitalCityKa: string;
    population: number;
    imgSrc: string;
  }) => {
    const cardObject = { ...newCardData };
    dispatch({
      type: "create",
      payload: {
        cardObject,
        currentLang,
      },
    });
  };


  //ფუნქციის დახმარებით წავშლით ქარდს
  const handleDeleteCard = (id: string) => {
    dispatch({
      type: "delete",
      payload: {
        id,
      },
    });
  };



  //ფუნქციის დახმარებით აღვადგენთ გამქრალ ქარდს
  const handleCardRestore = (id: string) => {
    dispatch({
      type: "restore",
      payload: {
        id,
      },
    });
  };




------------------------------------------------ეს ფუნქციები ისევ დაგჭირდება სავარაუდოდ  
  //ფუნქცია რომელსაც ვიყენებთ ლაიქების დასაწერად
  const handleCountriesVote = (id: string) => {
    dispatch({
      type: "upvote",
      payload: {
        id,
      },
    });
  };

  //ფუნქცია რომელსაც ფიყენებთ ლაიქების მიხედვით card ების დასალაგებლად
  const handleSortChange = (sortType: "asc" | "desc") => {
    dispatch({
      type: "sort",
      payload: {
        sortType,
      },
    });
  };




 const handleUpdateCountry = (updatedData: EditCardData) => {
    const idToNumber = Number(updatedData.id);
    const oldData = countries[idToNumber - 1];

    const data = {
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
      population: updatedData.population !== 0 ? updatedData.population : 4,
      imgSrc: updatedData.imgSrc !== "" ? updatedData.imgSrc : oldData.imgSrc,
      article: {
        en: "New Article",
        ka: "ახალი ტექსტი",
      },
      vote: 0,
      deleteStatus: false,
    };

    if (Number(updatedData.id) > 6) {
      
      mutate({id:updatedData.id,payload:data},{onSuccess:() => refetchCountries()})

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
  id: string;
  vote: number;
  deleteStatus: boolean;
};
*/
