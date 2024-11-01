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




*/