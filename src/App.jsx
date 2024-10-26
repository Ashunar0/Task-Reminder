import "./App.css";
import { useState } from "react";
import { Card } from "./components/Card";

function App() {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const [titles, setTitles] = useState([]);

  return (
    <>
      <header>
        <div className="header-title">リマインダー</div>
      </header>

      <div className="main-container">
        {titles.map((title) => (
          <Card title={title} key={title} />
        ))}

        <div className="add-list">
          <input
            className="input-todo"
            type="text"
            onChange={onChange}
            value={value}
          />
          <button
            className="input-button"
            onClick={() => {
              setTitles([...titles, value]);
            }}
          >
            カードを追加
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
