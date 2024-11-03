import axios from "axios";
import { promises as fs } from "fs";


const transformCountryData = (country, id) => ({
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
  id: id.toString(), 
  article: {
    en: "Default Article",
    ka: "არტიკლის ტექსტი",
  },
  vote: 0,
  deleteStatus: false,
});

// Fetch data from the API and write to database.json
const seedDatabase = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const newCountries = response.data;

    // Read existing data from database.json, or create a new object if it doesn't exist
    let dbData = { countries: [] };
    try {
      const existingData = await fs.readFile("database.json", "utf-8");
      dbData = JSON.parse(existingData);
    } catch (error) {
      if (error.code !== "ENOENT") throw error; // Ignore if file doesn't exist
    }

    // Generate unique IDs for new countries
    const existingCountries = dbData.countries;
    const startingId = existingCountries.length + 1;

    // Update IDs for new countries
    const newCountriesWithIds = newCountries.map((country, index) => {
        return transformCountryData(country, startingId + index);
    });

    // Merge new countries with existing ones, filtering out duplicates
    const existingCountryIds = new Set(
      existingCountries.map((country) => country.id),
    );
    const mergedCountries = [
      ...existingCountries,
      ...newCountriesWithIds.filter(
        (country) => !existingCountryIds.has(country.id),
      ),
    ];

    // Write the merged data back to database.json
    dbData.countries = mergedCountries;
    await fs.writeFile("database.json", JSON.stringify(dbData, null, 2));
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
