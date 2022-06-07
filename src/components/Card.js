import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    

        handleChoice(card);
    
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front"></img>
        <img
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
          className="back"
        ></img>
      </div>
    </div>
  );
}
