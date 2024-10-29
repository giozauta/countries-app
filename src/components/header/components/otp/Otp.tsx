import { useState, useRef } from "react";
import styles from "./otp.module.css";

const Otp: React.FC = () => {
  const [otpInputLength, setOtpInputLength] = useState<number>(1);
  const [otpInput, setOtpInput] = useState([{ value: "" }]);
  const otpInputRef = useRef<{ [key: number]: HTMLInputElement | null }>({});

  //this code sets otpInputLength
  const handleOtpLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const length = parseInt(event.target.value);
    //this code sets otpInput
    if (length === 0 || length > 4) {
      alert("Number cant be less than 0 and more than 4");
    } else {
      const inputs = [];
      setOtpInputLength(length);
      for (let i = 0; i < length; i++) {
        inputs.push({ value: "" });
      }
      setOtpInput(inputs);
    }
  };
  //this code sets otpInput
  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = event.target.value;
    setOtpInput(
      otpInput.map((item, i) => {
        item.value = i === index ? newValue : item.value;
        return item;
      }),
    );

    if (newValue) {
      if (otpInputRef.current[index + 1] == undefined) {
        otpInputRef.current[index]?.blur();
      }
      otpInputRef.current[index + 1]?.focus();
    }
  };
  //this code uses backspace
  const handleBackspace = (event:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
    const keyCode = event.key;
    if(keyCode === "Backspace"){
      setOtpInput(
        otpInput.map((item, i) => {
          item.value = i === index ? "" : item.value;
          return item;
        }), 
      );
      otpInputRef.current[index-1]?.focus()
      console.log(index)
    }

  }
  return (
    <div className={styles.otpComponent}>
      <div className={styles.otpLengthBox}>
        <p>OTP Length</p>
        <input
          onChange={handleOtpLengthChange}
          type="number"
          name="otpInputLength"
          value={otpInputLength}
        />
      </div>
      <div className={styles.otpBox}>
        {otpInput.map((item, index) => (
          <input
            onChange={(event) => {
              handleOtpChange(event, index);
            }}
            onKeyDown={(event)=>{
              handleBackspace(event,index);
            }}
            ref={(inputElementReference) => {
              otpInputRef.current[index] = inputElementReference;
            }}
            key={index}
            value={item.value}
            type="number"
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
