import styles from "./showEditButton.module.css";

type ShowEditButtonProps = {
  onSHowEditButtonClick: (id: string) => void;
  id: string;
  isMutateLoading: boolean;
  isCountryError: boolean;
  countryError: string | null;
};

const ShowEditButton: React.FC<ShowEditButtonProps> = ({
  onSHowEditButtonClick,
  id,
  isMutateLoading,
  isCountryError,
  countryError,
}) => {
  if (isCountryError && countryError) {
    return <div>{countryError}</div>;
  }
  return (
    <button
      onClick={() => onSHowEditButtonClick(id)}
      className={styles.showEditButton}
      disabled={isMutateLoading}
    >
      Edit
    </button>
  );
};

export default ShowEditButton;
