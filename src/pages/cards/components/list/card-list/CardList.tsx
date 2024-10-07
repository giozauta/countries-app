import { useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';
import CardImage from '../card-image';
import CardContent  from '../card-content';

 const CardList = () => {
    const [country]=useState([
            {
                name: "Japan",
                capitalCity: "Tokyo",
                population: 124,
                article:"Japan[a] is an island country in East Asia. It is located in the Pacific Ocean off the northeast coast of the Asian mainland, and is bordered on the west by the Sea of Japan and extends from the Sea of Okhotsk in the north to the East China Sea in the south. The Japanese archipelago consists of four major islands—Hokkaido, Honshu, Shikoku, and Kyushu—and thousands of smaller islands, covering 377,975 square kilometres (145,937 sq mi). Japan has a population of nearly 124 million as of 2024, and is the eleventh-most populous country. Its capital and largest city is Tokyo; the Greater Tokyo Area is the largest metropolitan area in the world, with more than 38 million inhabitants as of 2016. Japan is divided into 47 administrative prefectures and eight traditional regions. About three-quarters of the country's terrain is mountainous and heavily forested, concentrating its agriculture and highly urbanized population along its eastern coastal plains. The country sits on the Pacific Ring of Fire, making its islands prone to destructive earthquakes and tsunamis.",
                imgSrc: "/images/japan.jpg",
                id:"1"
            },
            {      
                name: "france",
                capitalCity: "Paris",
                population: 67,
                article:"France,[a] officially the French Republic,[b] is a country located primarily in Western Europe. Its overseas regions and territories include French Guiana in South America, Saint Pierre and Miquelon in the North Atlantic, the French West Indies, and many islands in Oceania and the Indian Ocean, giving it one of the largest discontiguous exclusive economic zones in the world. Metropolitan France shares borders with Belgium and Luxembourg to the north, Germany to the northeast, Switzerland to the east, Italy and Monaco to the southeast, Andorra and Spain to the south, and a maritime border with the United Kingdom to the northwest. Its metropolitan area extends from the Rhine to the Atlantic Ocean and from the Mediterranean Sea to the English Channel and the North Sea. Its eighteen integral regions (five of which are overseas) span a combined area of 643,801 km2 (248,573 sq mi) and have a total population of 68.4 million as of January 2024.[6][8] France is a semi-presidential republic with its capital in Paris, the country's largest city and main cultural and commercial centre.",
                imgSrc: "/images/france.jpg",
                id:"2"
                
            },
            {      
                name: "greece",
                capitalCity: "Athens",
                population: 10,
                article:"Greece,[a] officially the Hellenic Republic,[b] is a country in Southeast Europe. Located on the southern tip of the Balkan peninsula, Greece shares land borders with Albania to the northwest, North Macedonia and Bulgaria to the north, and Turkey to the east. The Aegean Sea lies to the east of the mainland, the Ionian Sea to the west, and the Sea of Crete and the Mediterranean Sea to the south. Greece has the longest coastline on the Mediterranean Basin, featuring thousands of islands. The country comprises nine traditional geographic regions, and has a population of over 10.4 million. Athens is the nation's capital and largest city, followed by Thessaloniki and Patras.",
                imgSrc: "/images/greece.jpg",
                id:"3"
            }]
    );


  return (
        <div className={styles.homeCardsBox}>
            {country.map(country => (
                <Card key={country.id} id={country.id}>
                    <CardImage imgSrc={country.imgSrc} />
                    <CardContent country={country} />
                </Card>
            ))}
        </div>
  )
}

export default CardList ; 
