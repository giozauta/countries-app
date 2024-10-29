import {useState} from 'react';
import styles from './otp.module.css';



const Otp:React.FC= () => {
  const [otpInputLength, setOtpInputLength] = useState<number>(0);
  const [otpInput, setOtpInput] = useState([{value:""}]);

  const handleOtpLengthChange= (event:React.ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(event.currentTarget.value);
    console.log(length)
    setOtpInputLength(length);
    
    //this code sets otpInput  
    const inputs = [];
    for (let i = 0; i < length; i++) {
      if(i<10){
        inputs.push({ value: "" });
      }else{
        alert("You cant add above 10")
        setOtpInputLength(0);
        return;
      }
    }
    setOtpInput(inputs);
  };

  return (
    <div className={styles.otpBox}>
      <input 
        onChange={handleOtpLengthChange} 
        type="number" 
        name="otpInputLength" 
        value={otpInputLength}
      />
      {otpInput.map((item, index) => (
        <input 
          key={index} 
          value={item.value} 
          type="number"
        />
      ))}
    </div>
  );
};

export default Otp;
