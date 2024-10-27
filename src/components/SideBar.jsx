import { useState } from "react";

export const Sidebar = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const [titles, setTitles] = useState([]);

  return (
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
  );
};
