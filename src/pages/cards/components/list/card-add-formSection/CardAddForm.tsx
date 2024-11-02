import React, { FormEvent, useState } from "react";
import styles from "./cardAddForm.module.css";
import { useParams } from "react-router-dom";

type CardCreateFormProps = {
  onCardCreate: (newCardData: {
    countryNameEn: string;
    countryNameKa: string;
    capitalCityEn: string;
    capitalCityKa: string;
    population: number;
    imgSrc: string;
  }) => void;
};

const CardAddForm: React.FC<CardCreateFormProps> = ({ onCardCreate }) => {
  const [inputState, setInputState] = useState({
    countryNameEn: "",
    countryNameKa: "",
    capitalCityEn: "",
    capitalCityKa: "",
    population: 0,
    imgSrc: "",
  });
  const [inputStateErr, setInputStateErr] = useState({
    countryNameErrEn: "",
    countryNameErrKa: "",
    capitalCityErrEn: "",
    capitalCityErrKa: "",
    populationErr: "",
  });
  const { lang } = useParams();
  const currentLang = lang ?? "en";

  //გვჭირდება იმისთვის რომ შევამოწმოთ სწორ ენაზე შეავსო თუარა იუზერმა ინფუთი
  const georgian: string[] = [
    "ა",
    "ბ",
    "გ",
    "დ",
    "ე",
    "ვ",
    "ზ",
    "თ",
    "ი",
    "კ",
    "ლ",
    "მ",
    "ნ",
    "ო",
    "პ",
    "ჟ",
    "რ",
    "ს",
    "ტ",
    "უ",
    "ფ",
    "ქ",
    "ღ",
    "ყ",
    "შ",
    "ჩ",
    "ც",
    "ძ",
    "წ",
    "ჭ",
    "ხ",
    "ჰ",
  ];
  const english: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  //ამ ფუნქციის დახმარებით ვამოწმებთ სწორ ენაზე შეავსო თუარა იუზერმა ინფუთი
  function checkIfAllEnglishLetters(word: string, alphabet: string[]) {
    return word.split("").every((char) => alphabet.includes(char));
  }

  //ფუნქცია გვჭირდება ფორმის ვალიდაციისთვის რომ არ მოხდეს არასწორი subbmit ანუ თუ ერორ მესიჯები ცარიელია მოხდება subbmit
  const validateState = (state: {
    countryNameErrEn: string;
    countryNameErrKa: string;
    capitalCityErrEn: string;
    capitalCityErrKa: string;
    populationErr: string;
  }) => {
    if (
      state.countryNameErrEn !== "" ||
      state.countryNameErrKa !== "" ||
      state.capitalCityErrEn !== "" ||
      state.capitalCityErrKa !== "" ||
      state.populationErr !== ""
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = event.currentTarget as HTMLInputElement;

    //სთეითი აფდეითდება ამ კოდით
    if (name === "imgSrc" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setInputState({
          ...inputState,
          imgSrc: reader.result as string, // Store Base64 string in imgSrc
        });
      };

      reader.readAsDataURL(file); // Convert image to Base64
    } else {
      setInputState({
        ...inputState,
        [name]: value,
      });
    }
    //ერორები გამოაქვს თუ არასწორია ინფორმაცია
    //
    if (name === "countryNameEn") {
      if (!checkIfAllEnglishLetters(value, english)) {
        setInputStateErr({
          ...inputStateErr,
          countryNameErrEn:currentLang==="en"?"It must contain only english letters":"გთხოვთ შეავსოთ ინგლისური ასოებით",
        });
      } else {
        setInputStateErr({
          ...inputStateErr,
          countryNameErrEn: "",
        });
      }
    }
    if (name === "countryNameKa") {
      if (!checkIfAllEnglishLetters(value, georgian)) {
        setInputStateErr({
          ...inputStateErr,
          countryNameErrKa:currentLang=="en"?"It must contain only georgian letters":"გთხოვთ შეავსოთ ქართული ასოებით",
        });
      } else {
        setInputStateErr({
          ...inputStateErr,
          countryNameErrKa: "",
        });
      }
    }
    //
    if (name === "capitalCityEn") {
      if (!checkIfAllEnglishLetters(value, english)) {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErrEn: currentLang=="en"?"It must contain only English letters":"გთხოვთ შეავსოთ ინგლისური ასოებით",
        });
      } else {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErrEn: "",
        });
      }
    }
    if (name === "capitalCityKa") {
      if (!checkIfAllEnglishLetters(value, georgian)) {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErrKa:currentLang=="en"?"It must contain only georgian letters":"გთხოვთ შეავსოთ ქართული ასოებით",
        });
      } else {
        setInputStateErr({
          ...inputStateErr,
          capitalCityErrKa: "",
        });
      }
    }
    //
    if (name === "population") {
      if (value.length > 6) {
        setInputStateErr({
          ...inputStateErr,
          populationErr: "It must be less than 6 characters",
        });
      } else {
        setInputStateErr({
          ...inputStateErr,
          populationErr: "",
        });
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //თუ ველები არ იქნება შევსებული გამოვა ალერთი და დაბრუნდება ფუნქცია რაც საშუალებას აღარ მოგვცემს რომ ქარდი დავამატოთ
    if (
      inputState.countryNameEn === "" ||
      inputState.capitalCityEn === "" ||
      inputState.population === 0 ||
      inputState.imgSrc === ""
    ) {
      if (currentLang === "en") {
        alert("All fields are required");
        return;
      } else {
        alert("გთხოვთ შეავსოთ ყველა ველი");
        return;
      }
    }
    //თუ ყველა ერორი ცარიელია დაგვიბრუნდება true და შევძლებთ საბმითს
    if (validateState(inputStateErr)) {
      onCardCreate(inputState);

      setInputState({
        countryNameEn: "",
        countryNameKa: "",
        capitalCityEn: "",
        capitalCityKa: "",
        population: 0,
        imgSrc: "",
      });
      setInputStateErr({
        countryNameErrEn: "",
        countryNameErrKa: "",
        capitalCityErrEn: "",
        capitalCityErrKa: "",
        populationErr: "",
      });

      if (currentLang === "en") {
        alert("New card added successfully");
      }
      if (currentLang === "ka") {
        alert("ახალი ქარდი წარმატებით დაემატა");
      }
    }
  };

  return (
    <div id="cardAddFormBox" className={styles.cardAddFormBox}>
      <form className={styles.cardAddForm} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            value={inputState.countryNameEn}
            type="text"
            name="countryNameEn"
            placeholder={
              currentLang === "en"
                ? "Country Name in English"
                : "ქვეყანის სახელი ინგლისურად"
            }
          />
          <span className={styles.errBox}>
            {inputStateErr.countryNameErrEn}
          </span>
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            value={inputState.countryNameKa}
            type="text"
            name="countryNameKa"
            placeholder={
              currentLang === "en"
                ? "Country Name in Georgian"
                : "ქვეყანის სახელი ქართულად"
            }
          />
          <span className={styles.errBox}>
            {inputStateErr.countryNameErrKa}
          </span>
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            value={inputState.capitalCityEn}
            type="text"
            name="capitalCityEn"
            placeholder={
              currentLang === "en"
                ? "Capital City in English"
                : "დედაქალაქი ინგლისურად"
            }
          />
          <span className={styles.errBox}>
            {inputStateErr.capitalCityErrEn}
          </span>
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            value={inputState.capitalCityKa}
            type="text"
            name="capitalCityKa"
            placeholder={
              currentLang === "en"
                ? "Capital City in Georgian"
                : "დედაქალაქი ქართულად"
            }
          />
          <span className={styles.errBox}>
            {inputStateErr.capitalCityErrKa}
          </span>
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            value={inputState.population}
            type="number"
            name="population"
            placeholder={currentLang === "en" ? "Population" : "მოსახლეობა"}
          />
          <span className={styles.errBox}>{inputStateErr.populationErr}</span>
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={handleChange}
            type="file"
            name="imgSrc"
            accept=".jpg,.png"
          />
        </div>
        <button type="submit" className={styles.subbmitCardButton}>
          {currentLang === "en" ? "Create" : "შექმნა"}
        </button>
      </form>
    </div>
  );
};

export default CardAddForm;
