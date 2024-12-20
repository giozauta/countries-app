import axios from "axios";
import fs from "fs";

const transformCountryData = (country, index, startIndex) => ({
  id: (startIndex + index + 1).toString(),
  countryName: {
    en: country.name.common,
    ka: country.name.common,
  },
  capitalCity: {
    en: country.capital ? country.capital[0] : "N/A",
    ka: country.capital ? country.capital[0] : "N/A",
  },
  population: country.population,
  imgSrc: country.flags.png,
  article: {
    en: "Default Article",
    ka: "არტიკლის ტექსტი",
  },
  vote: 0,
  deleteStatus: false,
});

const seedDatabase = () => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => {
      const countriesToAdd = res.data;

      fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading db.json", err);
          return;
        }

        const database = data ? JSON.parse(data) : {};
        const existingCountries = database.countries || [];

        const startIndex = existingCountries.length;

        const transformedData = countriesToAdd.map((country, index) =>
          transformCountryData(country, index, startIndex),
        );

        database.countries = [...existingCountries, ...transformedData];

        fs.writeFile("db.json", JSON.stringify(database, null, 2), (err) => {
          if (err) {
            console.error("Error writing to db.json", err);
          } else {
            console.log("Data successfully added to db.json");
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching country data", error);
    });
};

seedDatabase();
