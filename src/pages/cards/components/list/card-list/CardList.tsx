import {FormEvent, useReducer, useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';
import CardImage from '../card-image';
import CardContent  from '../card-content';
import CardinteractSection from '../card-interact-section';
import cardsInitialState from "./reducer/state";
import CardAddForm from '../card-add-formSection';
import {cardsReducer} from './reducer/reducer';


const CardList:React.FC = () => {
  //ამ სთეითის დახმარებით გამოვაჩენთ ქარდის დასამატებელ პანელს 
  const [formSection,setFormSection]=useState(false);

  const [countriesList,dispatch] = useReducer(
    cardsReducer,
    cardsInitialState
  );


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
      type:"sort",
      payload:{
        sortType,
      }
    })
  };

    //ფუნქციის დახმარებით ვამატებთ ახალ cards ებს
  const handleCreateCard = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardObject :any ={};
    const cardFormData = new FormData(event.currentTarget);
    for(const [key,value] of cardFormData){
      cardObject[key] = value;
    }
    dispatch({
      type:"create",
      payload:{
        cardObject,
      }
    })
  };
  //ფუნქციის დახმარებით აღვადგენთ გამქრალ ქარდს 
  const handleCardRestore=(id:string)=>{
    dispatch({
      type:"restore",
      payload:{
        id,
      }
    })
  }
  //ფუნქციის დახმარებით წავშლით ქარდს
  const handleDeleteCard=(id:string)=>{
    dispatch({
      type:"delete",
      payload:{
        id,
      }
    })
  }

  return (
    <section className={styles.CardListSection}>
        <div className={styles.cardButtonSection}>
            <button onClick={()=>handleSortChange("asc")} className={styles.sortButton}>Asc</button>
            <button onClick={()=>handleSortChange("desc")} className={styles.sortButton}>Desc</button>
            <button className={styles.addCardButton} onClick={()=>setFormSection((prevState)=>{return !prevState})}>Add Card</button>
            {formSection? <CardAddForm onCardCreate={handleCreateCard}/>:null}
        </div>
        <div className={styles.CardsBox}>
            {countriesList.sort((a, b) => a.deleteStatus - b.deleteStatus).map(country => (
                <Card  handleCardRestore={handleCardRestore} id={country.id} deleteStatus={country.deleteStatus} key={country.id}>
                    <CardImage imgSrc={country.imgSrc} />
                    <CardContent handleCountriesVote={handleCountriesVote} country={country} />
                    <CardinteractSection handleDeleteCard={handleDeleteCard} country={country} handleCountriesVote={handleCountriesVote} />
                </Card>
            ))}
        </div>
    </section>
  )
}

export default CardList ; 