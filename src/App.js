import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched : false },
  { src: "/img/potion-1.png", matched : false },
  { src: "/img/ring-1.png", matched : false },
  { src: "/img/scroll-1.png", matched : false },
  { src: "/img/shield-1.png", matched : false },
  { src: "/img/sword-1.png", matched : false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(true);

  // shuffle cards
  const shuffleCards = () => {
    // sort function calls the given function for each item and if the number is below 0, the order is not changed, if the number is above 0 the order is changed
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);

    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    console.log(choiceOne, choiceTwo);
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // Can not compare cards here, because state update is not instant. Have to use useEffect as it will be called when the dependency changes.
  };

  // compare two cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            // If card source matches the choice source then replace that card
            if (card.src === choiceOne.src) {
              // Return the same card but matched is change
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
      } else {

      }
      setTimeout(() => resetTurn(), 1000);

    }

  }, [choiceOne, choiceTwo])


  console.log(cards);


  // reset choices and increment turns;
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
  }

  return (
    <div className="App">
      <h1>Magic match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disable}/>
        ))}
      </div>
    </div>
  );
}

export default App;
