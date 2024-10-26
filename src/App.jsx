import "./App.css";
import { useState } from "react";
import { Card } from "./components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addCard = () => {
    if (inputValue === "") return;
    setCards([...cards, { id: crypto.randomUUID(), text: inputValue }]);
    setInputValue("");
  };

  const deleteCard = (id) => () => {
    const updatedCards = cards.filter((tempCard) => {
      return tempCard.id !== id;
    });
    setCards(updatedCards);
  };

  return (
    <>
      <header>
        <div className="header-title">リマインダー</div>
      </header>

      <div className="main-container">
        <div className="list-container">
          <div className="list-header">学校</div>
          <div className="cards-container">
            {cards.map((card) => (
              <Card key={card.id} card={card} deleteCard={deleteCard} />
            ))}
          </div>
          <div className="list-footer">
            <div className="input-container">
              <input
                type="text"
                className="input-todo"
                value={inputValue}
                onInput={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <div className="input-button" onClick={addCard}>
                追加
              </div>
            </div>
          </div>
        </div>

        <div className="list-container">
          <div className="list-header">大学</div>
          <div className="cards-container">
            <div className="card">
              <div className="todo">これをやる</div>
              <div className="delete"></div>
            </div>
            <div className="card">
              <div className="todo">それをやる</div>
              <div className="delete"></div>
            </div>
          </div>
          <div className="list-footer">＋カードを追加</div>
        </div>
      </div>
    </>
  );
}

export default App;
