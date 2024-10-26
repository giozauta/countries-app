import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./contactContent.module.css";
import { data } from "./contact-content-data";

type contentDataType = {
  en: {
    title: string;
    fullName: string;
    lastName: string;
    email: string;
    message: string;
    send: string;
  };
  ka: {
    title: string;
    fullName: string;
    lastName: string;
    email: string;
    message: string;
    send: string;
  };
};

const ContactContent: React.FC = () => {
  const [error, setError] = useState("");
  const [contactState, setContactState] = useState({
    fullName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const { lang } = useParams();
  const currentLang = lang === "en" || lang === "ka" ? lang : "en";
  const contentData: contentDataType = data;

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setContactState({
      ...contactState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      contactState.fullName === "" ||
      contactState.lastName === "" ||
      contactState.email === "" ||
      contactState.message === ""
    ) {
      setError("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }
    if (contactState.fullName.length < 3) {
      setError("სახელი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან");
      return;
    }
    if (contactState.lastName.length < 3) {
      setError("გვარი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან");
      return;
    }
    if (contactState.email.indexOf("@") == -1) {
      setError("ელ.ფოსტა უნდა შეიცავდეს @ სიმბოლოს");
      return;
    }
    if (contactState.message.length > 80) {
      setError("მესიჯი უნდა შეიცავდეს მაქსიმუმ 80 სიმბოლოს");
      return;
    }

    setError("");
    setContactState({
      fullName: "",
      lastName: "",
      email: "",
      message: "",
    });
    alert("მონაცემები წარმატებით აიტვირთა");
  };

  return (
    <div className={styles.contactBox}>
      <h2>{contentData[currentLang].title}</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={contactState.fullName}
          type="text"
          name="fullName"
          placeholder={contentData[currentLang].fullName}
        />
        <input
          onChange={handleChange}
          value={contactState.lastName}
          type="text"
          name="lastName"
          placeholder={contentData[currentLang].lastName}
        />
        <input
          onChange={handleChange}
          value={contactState.email}
          type="text"
          name="email"
          placeholder={contentData[currentLang].email}
        />
        <textarea
          onChange={handleChange}
          value={contactState.message}
          name="message"
          placeholder={contentData[currentLang].message}
        ></textarea>
        <button type="submit">{contentData[currentLang].send}</button>
      </form>
      <div>
        <h3>{error}</h3>
      </div>
    </div>
  );
};

export default ContactContent;
