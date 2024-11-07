export type CountryType = {
    id: string;
    countryName: {
      en: string;
      ka: string;
    };
    capitalCity: {
      en: string;
      ka: string;
    };
    population: number;
    imgSrc: string;
    article: {
      en: string;
      ka: string;
    };
    vote: number;
    deleteStatus: boolean;
  };