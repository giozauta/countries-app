import SingleCard from "../../components/single";
import { useParams } from "react-router-dom";
import cardsInitialState from "../../components/list/card-list/reducer/state";

const SingleCardView: React.FC = () => {
  const { id } = useParams();
  const cardInfo = cardsInitialState.find((countrie) => countrie.id == id);
  const cardInfoNotFound = !cardInfo;

  if (cardInfoNotFound) {
    return <div>Card Not Found</div>;
  }

  return (
    <div>
      <SingleCard cardData={cardInfo} />
    </div>
  );
};

export default SingleCardView;
