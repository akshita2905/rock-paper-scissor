import "./App.css";
import { useState } from "react";
import Popup from "reactjs-popup";

const choicesList = [
  {
    id: "ROCK",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png",
  },
  {
    id: "SCISSORS",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png",
  },
  {
    id: "PAPER",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png",
  },
];

const App = () => {
  const [score, setScore] = useState(0);
  const [para, setPara] = useState("");
  const [point, setPoints] = useState(true);
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  const handlePlayAgain = () => {
    setPoints(true);
  };

  const handleScore = (id, imageUrl) => {
    const num = Math.floor(Math.random() * choicesList.length);
    const computerChoiceId = choicesList[num].id;
    const computerChoiceImage = choicesList[num].imageUrl;
    setComputerChoice(computerChoiceImage);
    setUserChoice(imageUrl);
    if (computerChoiceId === id) {
      setPara("IT IS DRAW");
    } else if (
      (computerChoiceId === "SCISSORS" && id === "ROCK") ||
      (computerChoiceId === "PAPER" && id === "SCISSORS") ||
      (computerChoiceId === "ROCK" && id === "PAPER")
    ) {
      setScore(score + 1);
      setPara("YOU WON");
    } else {
      setScore(score - 1);
      setPara("YOU LOSE");
    }
    setPoints(false);
  };

  return (
    <div className="app-container">
      <div className="header-card">
        <div>
          <h1 className="game-title">Rock Paper Scissors</h1>
        </div>
        <div className="score-box">
          <p className="score-text">Score</p>
          <p className="score-value">{score}</p>
        </div>
      </div>

      {point ? (
        <div className="choices-container">
          {choicesList.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="choice-btn"
              onClick={() => handleScore(choice.id, choice.imageUrl)}
              data-testid={`${choice.id.toLowerCase()}Button`}
            >
              <img src={choice.imageUrl} alt={choice.id} />
            </button>
          ))}
        </div>
      ) : (
        <div className="result-container">
          <p>{para}</p>
          <div className="result-container-inner-div">
            
            <div><span>YOU</span><br />
              <img src={userChoice} alt="userChoice" />
            </div>
            <div>
            <span>OPPONENT</span><br />
            <img src={computerChoice} alt="computerChoice" />
            </div>
          </div>
          <button
            type="button"
            className="play-again-btn"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}

      <div className="popup-container">
        <Popup
          modal
          nested
          lockScroll
          contentStyle={{
            width: "100vw",
            height: "100vh",
            padding: 0,
            borderRadius: 0,
          }}
          overlayStyle={{ background: "rgba(0, 0, 0, 0.85)" }}
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {(close) => (
            <div className="full-screen-popup">
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
              <button
                type="button"
                className="trigger-button close-fullscreen-btn"
                onClick={() => close()}
              >
                Close
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default App;
