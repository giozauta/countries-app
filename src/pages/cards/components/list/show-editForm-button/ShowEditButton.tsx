import styles from "./showEditButton.module.css";

type ShowEditButtonProps = {
  onSHowEditButtonClick: (id: string) => void;
  id: string;
  isMutateLoading: boolean;
};

const ShowEditButton: React.FC<ShowEditButtonProps> = ({
  onSHowEditButtonClick,
  id,
  isMutateLoading,
}) => {
  if (isMutateLoading) {
    return (
      <button
        onClick={() => onSHowEditButtonClick(id)}
        className={styles.showEditButtonDisabled}
        disabled
      >
        Loading...
      </button>
    );
  }
  return (
    <button
      onClick={() => onSHowEditButtonClick(id)}
      className={styles.showEditButton}
    >
      Edit
    </button>
  );
};

export default ShowEditButton;
