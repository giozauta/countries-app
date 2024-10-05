import { FormEvent } from 'react';
import styles from './ContactContent.module.css';

const ContactContent:React.FC =()=> {

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues ={
      name: event.currentTarget.fullName.value,
      lastName: event.currentTarget.lastName.value,
      email: event.currentTarget.email.value,
      message: event.currentTarget.message.value
    }
    console.log(formValues);

    if(!formValues.name || !formValues.lastName || !formValues.email || !formValues.message){
      alert("შეავსეთ ყველა ველი")
    }else{
      alert("მესიჯი გაგზავნილია")
      event.currentTarget.reset()
    }
  };
  

  return (
    <div className={styles.contactBox}>
      <h2>Contact Us</h2>
      <form className={styles.contactForm} onSubmit={(handleSubmit)}>
        <input type="text" name="fullName" placeholder="Full Name"/>
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <textarea name="message" placeholder="Message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ContactContent;
