import React, { FormEvent, useState } from 'react';
import styles from './CardAddForm.module.css';

type CardCreateFormProps = {
  onCardCreate: (newCardData: { countryName: string; capitalCity: string; population: string; }) => void;
}

const CardAddForm: React.FC<CardCreateFormProps> = ({ onCardCreate }) => {

  const [inputState, setInputState] = useState({
    countryName: "",
    capitalCity: "",
    population: ""
  });
  const [inputStateErr, setInputStateErr] = useState({
    countryNameErr: "",
    capitalCityErr: "",
    populationErr: ""
  });

  //ფუნქცია გვჭირდება ფორმის ვალიდაციისთვის რომ არ მოხდეს არასწორი subbmit
  const validateState=(state:{countryNameErr:string,capitalCityErr:string,populationErr:string})=>{
    if(state.countryNameErr!==""||state.capitalCityErr!==""||state.populationErr!==""){
      return false;
    }
    return true;
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const currentName = event.currentTarget.name;
    const currentValue = event.currentTarget.value;
    setInputState({
      ...inputState,
      [currentName]: currentValue
    });   
    if (currentName === "countryName") {
      if (currentValue.length < 3&&currentValue.length!==0) {
        setInputStateErr({
          ...inputStateErr,
          countryNameErr: "It must be at least 3 characters"
        });
        
      } else {
        setInputStateErr({
          ...inputStateErr,
          countryNameErr: ""
        }); 
      }
    }
    if (currentName === "capitalCity") {
      if (currentValue.length < 3&&currentValue.length!==0) {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErr: "It must be at least 3 characters"
        });
        
      } else {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErr: ""
        }); 
      }
    }
    if (currentName === "population") {
      if (currentValue.length>6) {
        setInputStateErr({
          ...inputStateErr,
          populationErr: "It must be less than 6 characters"
        });
       
      } else {
        setInputStateErr({
          ...inputStateErr,
          populationErr: ""
        }); 
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inputState.countryName===""||inputState.capitalCity===""||inputState.population===""){
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }
    if(validateState(inputStateErr)){
      onCardCreate(inputState);
      setInputState({
        countryName: "",
        capitalCity: "",
        population: ""
      });
      setInputStateErr({
        countryNameErr: "",
        capitalCityErr: "",
        populationErr: ""
      })
      alert("ახალი ქარდი წარმატებით დაემატა")
   }
  
  };

  return (
    <div id="cardAddFormBox" className={styles.cardAddFormBox}>
      <form className={styles.cardAddForm} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <input onChange={handleChange} value={inputState.countryName} type='text' name="countryName" placeholder='Country Name'  />
          <span className={styles.errBox}>{inputStateErr.countryNameErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input onChange={handleChange} value={inputState.capitalCity} type='text' name="capitalCity" placeholder='Capital City'  />
          <span className={styles.errBox}>{inputStateErr.capitalCityErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input onChange={handleChange} value={inputState.population} type='number' name="population" placeholder='Population'  />
          <span  className={styles.errBox}>{inputStateErr.populationErr}</span>
        </div>
        <button type="submit" className={styles.subbmitCardButton}>Submit</button>
      </form>
    </div>
  );
}

export default CardAddForm;
