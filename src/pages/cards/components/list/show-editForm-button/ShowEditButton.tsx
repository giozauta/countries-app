
import styles from "./showEditButton.module.css"

type ShowEditButtonProps = {
  onSHowEditButtonClick: (id:string) => void;
  id:string
}

const ShowEditButton:React.FC<ShowEditButtonProps>= ({onSHowEditButtonClick,id}) => {
  return <button onClick={() => onSHowEditButtonClick(id)} className={styles.showEditButton}>Edit</button>
}

export default ShowEditButton;
