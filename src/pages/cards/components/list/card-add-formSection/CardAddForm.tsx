import React, { FormEvent } from 'react'
import styles from './CardAddForm.module.css'

type CardCreateFormProps={
  onCardCreate:(event:FormEvent<HTMLFormElement>)=>void;
}

 const CardAddForm:React.FC<CardCreateFormProps>= ({onCardCreate}) =>{
  return (
    <div id="cardAddFormBox" className={styles.cardAddFormBox}>
        <form onSubmit={onCardCreate} className={styles.cardAddForm}>
            <input type='text' name="countryName" placeholder='Country Name' required/>
            <input type='text' name="capitalCity" placeholder='Capital City'required/>
            <input type='number' name="population" placeholder='Population' required/>
            <button type="submit" className={styles.subbmitCard}>Submit</button>
        </form>
    </div>
  )
}

export default CardAddForm; 
