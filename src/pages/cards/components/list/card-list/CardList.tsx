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

  return (
        <div className={styles.homeCardsBox}>
            {countries.map(country => (
                <Card key={country.id}>
                    <CardImage imgSrc={country.imgSrc} />
                    <CardContent handleCountriesVote={handleCountriesVote} country={country} />
                    <CardinteractSection country={country} handleCountriesVote={handleCountriesVote} />
                </Card>
            ))}
        </div>
  )
}

export default CardList ; 
