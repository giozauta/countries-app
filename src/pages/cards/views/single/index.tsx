import SingleCard from "../../components/single";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleCardView: React.FC = () => {
  const { id } = useParams();
  const [singleCard, setSingleCard] = useState({
    id: "",
    imgSrc: "",
    countryName: {
      en: "",
      ka: "",
    },
    article: {
      en: "",
      ka: "",
    },
    capitalCity: {
      en: "",
      ka: "",
    },
    population: 0,
    vote: 0,
    deleteStatus: false,
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/countries/${id}`).then((res) => {
      setSingleCard(res.data);
    });
  }, [id]);

  return (
    <div style={{height: "82vh" }}>
      <SingleCard cardData={singleCard} />
    </div>
  );
};

export default SingleCardView;
