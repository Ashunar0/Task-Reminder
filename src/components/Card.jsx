import PropTypes from "prop-types";
import { useState } from "react";

const useTodoList = () => {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [inputDeadline, setInputDeadline] = useState();

  const handleOnInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnInputDeadline = (e) => {
    setInputDeadline(e.target.value);
  };

  const deleteCard = (id) => () => {
    const updatedCards = cards.filter((tempCard) => {
      return tempCard.id !== id;
    });
    setCards(updatedCards);
  };

  const addCard = () => {
    if (inputValue === "" || inputDeadline === "") return;

    // inputDeadlineをM/D形式に変換
    const date = new Date(inputDeadline);
    const formattedDeadline = `${date.getMonth() + 1}/${date.getDate()}`;

    // 現在の日付との差分を日数で計算
    const today = new Date();
    const timeDifference = date - today; // ミリ秒での差分
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 日数に変換

    // 差分に応じて色を決定
    let cardColor;
    if (daysDifference < 0) {
      cardColor = "purple"; // 期日を過ぎている
    } else if (daysDifference >= 0 && daysDifference < 3) {
      cardColor = "red"; // 0日以上3日未満
    } else if (daysDifference >= 3 && daysDifference < 7) {
      cardColor = "yellow"; // 3日以上7日未満
    } else {
      cardColor = "green"; // 7日以上
    }

    setCards([
      ...cards,
      {
        id: crypto.randomUUID(),
        text: inputValue,
        deadlineText: formattedDeadline,
        color: cardColor,
      },
    ]);
    setInputValue("");
    setInputDeadline("");
  };

  return {
    cards,
    inputValue,
    inputDeadline,
    handleOnInputValue,
    handleOnInputDeadline,
    deleteCard,
    addCard,
  };
};

export const Card = ({ title }) => {
  const {
    cards,
    inputValue,
    inputDeadline,
    handleOnInputValue,
    handleOnInputDeadline,
    deleteCard,
    addCard,
  } = useTodoList();

  return (
    <div className="list-container">
      <div className="list-header">{title}</div>
      <div className="cards-container">
        {cards
          .slice() // 元の配列を変更しないためにsliceを使用
          .sort((a, b) => new Date(a.deadlineText) - new Date(b.deadlineText)) // 昇順でソート
          .map((card) => (
            <div className={`card card-${card.color}`} key={card.id}>
              <div className="todo">{card.text}</div>
              <div className="todo">{card.deadlineText}</div>
              <div className="delete" onClick={() => deleteCard(card.id)} />
            </div>
          ))}
      </div>

      <div className="list-footer">
        <div className="input-container">
          <input
            type="text"
            className="input-todo"
            value={inputValue}
            onInput={handleOnInputValue}
          />
          <input
            type="date"
            className="input-todo"
            value={inputDeadline}
            onInput={handleOnInputDeadline}
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
  color: PropTypes.string.isRequired, // colorがstringであることを指定
};
