import { useReducer, useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';
import CardImage from '../card-image';
import CardContent  from '../card-content';
import CardinteractSection from '../card-interact-section';
import cardsInitialState from "./reducer/state";
import CardAddForm from '../card-add-formSection';
import {cardsReducer} from './reducer/reducer';
import { useParams } from 'react-router-dom';


const CardList:React.FC = () => {
  const [formSection,setFormSection]=useState(false);//ფორმის პანელის გამოსაჩენად გვჭირდება 
  const [countriesList,dispatch] = useReducer(
    cardsReducer,
    cardsInitialState[0]
  );

  const {lang} = useParams();
  const currentLang = lang||'en';

    //ფუნქცია რომელსაც ვიყენებთ ლაიქების დასაწერად 
  const handleCountriesVote = (id: string,lang:string) => {
    dispatch({
      type: "upvote",
      payload: {
        id,
        lang,
      },
    });
  };
    
    //ფუნქცია რომელსაც ფიყენებთ ლაიქების მიხედვით card ების დასალაგებლად 
  const handleSortChange = (sortType: "asc" | "desc",lang:string) => {
    dispatch({
      type:"sort",
      payload:{
        sortType,
        lang,
      }
    })
  };

    //ფუნქციის დახმარებით ვამატებთ ახალ cards ებს
  const handleCreateCard = (newCardData:{countryName: string;capitalCity: string;population: string;})=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardObject ={...newCardData};
    dispatch({
      type:"create",
      payload:{
        cardObject,
      }
    })
    
  };
  //ფუნქციის დახმარებით აღვადგენთ გამქრალ ქარდს 
  const handleCardRestore=(id:string,lang:string)=>{
    dispatch({
      type:"restore",
      payload:{
        id,
        lang,
      }
    })
  }
  //ფუნქციის დახმარებით წავშლით ქარდს
  const handleDeleteCard=(id:string,lang:string)=>{
    dispatch({
      type:"delete",
      payload:{
        id,
        lang,
      }
    })
  }

  return (
    <section className={styles.CardListSection}>
        <div className={styles.cardButtonSection}>
            <button onClick={()=>handleSortChange("asc",currentLang)} className={styles.sortButton}>{currentLang==="en"?"Asc":"ზრდადი"}</button>
            <button onClick={()=>handleSortChange("desc",currentLang)} className={styles.sortButton}>{currentLang === "en" ? "Desc" : "კლებადი"}</button>
            <button className={styles.addCardButton} onClick={()=>setFormSection((prevState)=>{return !prevState})}>{currentLang === "en" ? "Add Card" : "დამატება"}</button>
            {formSection? <CardAddForm onCardCreate={handleCreateCard}/>:null}
        </div>
        <div className={styles.CardsBox}>
            {countriesList.sort((a, b) => a.deleteStatus - b.deleteStatus).map((country) => (
                <Card  handleCardRestore={handleCardRestore} id={country.id} deleteStatus={country.deleteStatus} key={country.id}>
                    <CardImage imgSrc={country.imgSrc} />
                    <CardContent country={country} />
                    <CardinteractSection handleDeleteCard={handleDeleteCard} country={country} handleCountriesVote={handleCountriesVote} />
                </Card>
            ))}
        </div>
    </section>
  )

}

export default CardList;
