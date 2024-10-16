import { FormEvent, useState } from 'react';
import styles from './ContactContent.module.css';

const ContactContent:React.FC =()=> {
  const [error,setError]=useState("");
  const [contactState,setContactState]=useState({
    fullName:"",
    lastName:"",
    email:"",
    message:""
  });
  

  const handleChange = (event:FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    event.preventDefault();
    setContactState({
      ...contactState,
      [event.currentTarget.name]:event.currentTarget.value
    })
  };

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(contactState.fullName===""||contactState.lastName===""||contactState.email===""||contactState.message===""){
      setError("გთხოვთ შეავსოთ ყველა ველი");
      return; 
    }
    if(contactState.fullName.length<3){
      setError("სახელი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან")
      return;
    }
    if(contactState.lastName.length<3){
      setError("გვარი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან")
      return;
    }
    if(contactState.email.indexOf("@")==-1){
      setError("ელ.ფოსტა უნდა შეიცავდეს @ სიმბოლოს")
      return;
    }
    if(contactState.message.length>80){
      setError("მესიჯი უნდა შეიცავდეს მაქსიმუმ 80 სიმბოლოს")      
      return;
    }

    setError("");
    setContactState({
      fullName:"",
      lastName:"",
      email:"",
      message:""
    })
    console.log(contactState);
    alert("მონაცემები წარმატებით აიტვირთა");
  };
  
  return (
    <div className={styles.contactBox}>
      <h2>Contact Us</h2>
      <form className={styles.contactForm} onSubmit={(handleSubmit)}>
        <input onChange={handleChange} value={contactState.fullName} type="text" name="fullName" placeholder="Full Name"/>
        <input onChange={handleChange} value={contactState.lastName} type="text" name="lastName" placeholder="Last Name" />
        <input onChange={handleChange} value={contactState.email} type="text" name="email" placeholder="Email" />
        <textarea onChange={handleChange} value={contactState.message} name="message" placeholder="Message"></textarea>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>{error}</h3>
      </div>
    </div>
  )
}

export default ContactContent;
