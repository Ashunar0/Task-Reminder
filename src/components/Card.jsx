import PropTypes from "prop-types";

export const Card = (props) => {
  const { card, deleteCard } = props;

  return (
    <div className="card">
      <div className="todo">{card.text}</div>
      <div className="delete" onClick={deleteCard}>
        削除
      </div>
    </div>
  );
};

// propsの型を定義
Card.propTypes = {
  card: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  deleteCard: PropTypes.func.isRequired,
};
