import "./App.css";
import { useState } from "react";
import { Card } from "./components/Card";
//import { Sidebar } from "./SideBar";

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
        <div className="add-list-container">
          <input
            className="input-list"
            type="text"
            onChange={onChange}
            value={value}
            placeholder="new List Name"
          />
          <button
            className="add-list-button"
            onClick={() => {
              setTitles([...titles, value]);
              setValue("");
            }}
          >
            リストを追加
          </button>
        </div>

        {titles.map((title) => (
          <Card title={title} key={title} />
        ))}
      </div>
    </>
  );
}

export default App;
