import styles from "./showEditButton.module.css";

type ShowEditButtonProps = {
  onSHowEditButtonClick: (id: string) => void;
  id: string;
  isMutateLoading: boolean;
  isCountryError: boolean;
};

const ShowEditButton: React.FC<ShowEditButtonProps> = ({
  onSHowEditButtonClick,
  id,
  isMutateLoading,
  isCountryError,
}) => {
  return (
    <button
      onClick={() => onSHowEditButtonClick(id)}
      className={styles.showEditButton}
      disabled={isMutateLoading || isCountryError}
    >
      Edit
    </button>
  );
};

export default ShowEditButton;
