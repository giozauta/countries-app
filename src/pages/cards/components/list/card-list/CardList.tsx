import { useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';
import CardImage from '../card-image';
import CardContent  from '../card-content';
import countriesList from '../../../static/countries-data';
import CardinteractSection from '../card-interact-section';

 const CardList = () => {
  const [countries,setCountries]=useState(countriesList);

  const handleCountriesVote = (id:string) => {
    const updatedCountries= countries.map(country => {
      if(country.id === id){
        return {...country, vote:country.vote+1}
      }
      return {...country}
    })
    setCountries(updatedCountries);
  }


  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    const sortedCountries = [...countries];
    if (sortValue === "likesUp") {
        sortedCountries.sort((a, b) => a.vote - b.vote); 
    } else if (sortValue === "likesDown") {
        sortedCountries.sort((a, b) => b.vote - a.vote); 
    }
    setCountries(sortedCountries); 
};

  return (
    <section className={styles.CardListSection}>
        <select className={styles.sortButton} id="sortCriteria" onChange={handleSortChange}>
            <option value="likesUp">Likes(Up)</option>
            <option value="likesDown">Likes(Down)</option>
        </select>
        <div className={styles.CardsBox}>
            {countries.map(country => (
                <Card key={country.id}>
                    <CardImage imgSrc={country.imgSrc} />
                    <CardContent handleCountriesVote={handleCountriesVote} country={country} />
                    <CardinteractSection country={country} handleCountriesVote={handleCountriesVote} />
                </Card>
            ))}
        </div>
    </section>

  )
}

export default CardList ; 
