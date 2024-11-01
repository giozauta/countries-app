import React, { FormEvent, useState } from 'react';
import styles from './cardEditForm.module.css';

/*type CardEditFormProps = {
  onSubmit: (updatedData: {
    countryNameEn: string;
    countryNameKa: string;
    capitalCityEn: string;
    capitalCityKa: string;
    population: number;
    imgSrc: string;
  }) => void;
};*/

const CardEditForm: React.FC= () => {
  const [inputState, setInputState] = useState({
    countryNameEn: '',
    countryNameKa: '',
    capitalCityEn: '',
    capitalCityKa: '',
    population: 0,
    imgSrc: '', // Ensure imgSrc is included here
  });

  const [errors, setErrors] = useState({
    countryNameEn: '',
    countryNameKa: '',
    capitalCityEn: '',
    capitalCityKa: '',
    population: '',
  });

  const georgianLetters = /^[ა-ჰ\s]*$/;
  const englishLetters = /^[A-Za-z\s]*$/;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value, files } = event.currentTarget;
    let errorMessage = '';

    if (name === 'countryNameEn' || name === 'capitalCityEn') {
      if (!englishLetters.test(value)) {
        errorMessage = 'Must contain only English letters';
      }
    } else if (name === 'countryNameKa' || name === 'capitalCityKa') {
      if (!georgianLetters.test(value)) {
        errorMessage = 'Must contain only Georgian letters';
      }
    } else if (name === 'population') {
      if (isNaN(Number(value)) || Number(value) < 0) {
        errorMessage = 'Population must be a positive number';
      }
    } else if (name === 'imgSrc' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setInputState((prev) => ({
          ...prev,
          imgSrc: reader.result as string, // Store Base64 string in imgSrc
        }));
      };

      reader.readAsDataURL(file); // Convert image to Base64
      return; // Prevent further processing in this case
    }

    setInputState((prev) => ({
      ...prev,
      [name]: name === 'population' ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting.');
    }
   // onSubmit(inputState);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          onChange={handleChange}
          value={inputState.countryNameEn}
          type="text"
          name="countryNameEn"
          placeholder="Country Name (English)"
        />
        <span className={styles.error}>{errors.countryNameEn}</span>

        <input
          className={styles.input}
          onChange={handleChange}
          value={inputState.countryNameKa}
          type="text"
          name="countryNameKa"
          placeholder="Country Name (Georgian)"
        />
        <span className={styles.error}>{errors.countryNameKa}</span>

        <input
          className={styles.input}
          onChange={handleChange}
          value={inputState.capitalCityEn}
          type="text"
          name="capitalCityEn"
          placeholder="Capital City (English)"
        />
        <span className={styles.error}>{errors.capitalCityEn}</span>

        <input
          className={styles.input}
          onChange={handleChange}
          value={inputState.capitalCityKa}
          type="text"
          name="capitalCityKa"
          placeholder="Capital City (Georgian)"
        />
        <span className={styles.error}>{errors.capitalCityKa}</span>

        <input
          className={styles.input}
          onChange={handleChange}
          value={inputState.population || ''} // Ensure to provide a fallback value
          type="number"
          name="population"
          placeholder="Population"
        />
        <span className={styles.error}>{errors.population}</span>

        <input
          className={styles.input}
          onChange={handleChange}
          type="file"
          name="imgSrc"
          accept=".jpg,.png"
        />


        <button type="submit" className={styles.submitButton}>
          Update Card
        </button>
      </form>
    </div>
  );
};

export default CardEditForm;
