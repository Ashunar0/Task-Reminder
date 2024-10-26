import PropTypes from "prop-types";
import { useState } from "react";

const useTodoList = (initialCards) => {
  const [cards, setCards] = useState(initialCards || []);
  const [inputValue, setInputValue] = useState();
  const handleOnInput = (e) => {
    setInputValue(e.target.value);
  };

  const deleteCard = (id) => () => {
    const updatedCards = cards.filter((tempCard) => {
      return tempCard.id !== id;
    });
    setCards(updatedCards);
  };

  const addCard = () => {
    if (inputValue === "") return;
    setCards([...cards, { id: crypto.randomUUID(), text: inputValue }]);
    setInputValue("");
  };

  return {
    cards,
    inputValue,
    handleOnInput,
    deleteCard,
    addCard,
  };
};

export const Card = ({ title }) => {
  const { cards, inputValue, handleOnInput, deleteCard, addCard } =
    useTodoList();
  return (
    <div className="list-container">
      <div className="list-header">{title}</div>
      <div className="cards-container">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="todo">{card.text}</div>
            <div className="delete" onClick={deleteCard(card.id)} />
          </div>
        ))}
      </div>
      <div className="list-footer">
        <div className="input-container">
          <input
            type="text"
            className="input-todo"
            value={inputValue}
            onInput={handleOnInput}
          />
          <div className="input-button" onClick={addCard}>
            追加
          </div>
        </div>
      </div>
    </div>
  );
};

// propsの型を定義
Card.propTypes = {
  title: PropTypes.string.isRequired,
};
