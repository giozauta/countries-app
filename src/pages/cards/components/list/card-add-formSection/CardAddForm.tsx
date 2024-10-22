import React, { FormEvent, useState } from 'react';
import styles from './CardAddForm.module.css';
import { useParams } from 'react-router-dom';

type CardCreateFormProps = {
  onCardCreate: (newCardData: { countryName: string; capitalCity: string; population:number;imgSrc:"jpg"|"png";article:string }) => void;
}

const CardAddForm: React.FC<CardCreateFormProps> = ({ onCardCreate }) => {
  const [inputState, setInputState] = useState({
    countryName: "",
    capitalCity: "",
    population:"",
    imgSrc: "",
    article:""
  });
  const [inputStateErr, setInputStateErr] = useState({
    countryNameErr: "",
    capitalCityErr: "",
    populationErr: ""
  });
  const {lang} = useParams();
  const currentLang = lang||'en';

 
//ფუნქცია გვჭირდება ფორმის ვალიდაციისთვის რომ არ მოხდეს არასწორი subbmit
  const validateState=(state:{countryNameErr:string,capitalCityErr:string,populationErr:string})=>{
    if(state.countryNameErr!==""||state.capitalCityErr!==""||state.populationErr!==""){
      return false;
    }
    return true;
  }

  const handleChange = (event: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value,files} = event.currentTarget as HTMLInputElement

//სთეითი აფდეითდება ამ კოდით 
  if (name === "imgSrc" && files && files[0]) {
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setInputState({
        ...inputState,
        imgSrc: reader.result as string // Store Base64 string in imgSrc
      });
    };

    reader.readAsDataURL(file); // Convert image to Base64
  } else {
    setInputState({
      ...inputState,
      [name]: value
    });
  } 
//ერორები გამოაქვს თუ არასწორია ინფორმაცია 
    if (name === "countryName") {
      if (value.length < 3&&value.length!==0) {
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
    if (name === "capitalCity") {
      if (value.length < 3&&value.length!==0) {
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
    if (name === "population") {
      if (value.length>6) {
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
//თუ ველები არ იქნება შევსებული გამოვა ალერთი და დაბრუნდება ფუნქცია რაც საშუალებას აღარ მოგვცემს რომ ქარდი დავამატოთ 
    if(inputState.countryName===""||inputState.capitalCity===""||inputState.population===""||inputState.imgSrc===""||inputState.article===""){
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }
//თუ ყველა ერორი ცარიელია დაგვიბრუნდება true და შევძლებთ საბმითს 
    if(validateState(inputStateErr)){
        onCardCreate(inputState);

        setInputState({
          countryName: "",
          capitalCity: "",
          population: "",
          imgSrc: "",
          article:""
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
          <input onChange={handleChange} value={inputState.countryName} type='text' name="countryName" placeholder={currentLang==="en"?"Country Name":"ქვეყანის სახელი"} />
          <span className={styles.errBox}>{inputStateErr.countryNameErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input onChange={handleChange} value={inputState.capitalCity} type='text' name="capitalCity" placeholder={currentLang==="en"?"Capital City":"დედაქალაქი"}  />
          <span className={styles.errBox}>{inputStateErr.capitalCityErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input onChange={handleChange} value={inputState.population} type='number' name="population" placeholder={currentLang==="en"?"Population":"მოსახლეობა"}  />
          <span  className={styles.errBox}>{inputStateErr.populationErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input onChange={handleChange}  type="file" name="imgSrc"   accept=".jpg,.png"/>
        </div>
        <div className={styles.inputBox}>
          <textarea onChange={handleChange} className={styles.articleTextarea} value={inputState.article} name="article" placeholder={currentLang==="en"?"Article":"ტექსტი"}/>
        </div>
        
        <button type="submit" className={styles.subbmitCardButton}>{currentLang==="en"?"Create":"შექმნა"}</button>
      </form>
    </div>
  );
}

export default CardAddForm;
