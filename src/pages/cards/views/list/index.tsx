import styles from "./cardListView.module.css";
import React from "react";
import countriesList from "../../static/countries-data";
import Hero from "../../components/list/hero/Hero";
import Card from "../../components/list/card";
import CardImage from "../../components/list/card-image";
import CardContent from "../../components/list/card-content";

const CardsListview: React.FC = () => {
    return (
      <>
        <Hero />
        <div className={styles.homeCardsBox}>
          <Card id={countriesList[0].id}>
            <CardImage imgSrc={countriesList[0].imgSrc} />
            <CardContent country={countriesList[0]} />
          </Card>

          <Card id={countriesList[1].id}>
            <CardImage imgSrc={countriesList[1].imgSrc} />
            <CardContent country={countriesList[1]} />
          </Card>

          <Card id={countriesList[2].id}>
            <CardImage imgSrc={countriesList[2].imgSrc} />
            <CardContent country={countriesList[2]} />
          </Card>
        </div>
      </>
    );
}

export default CardsListview;
