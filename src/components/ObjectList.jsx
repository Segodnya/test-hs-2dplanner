import React from "react";

const ObjectList = ({ addObject }) => {
  return (
    <div>
      <button onClick={() => addObject("Стол")}>Добавить стол</button>
      <button onClick={() => addObject("Стул")}>Добавить стул</button>
      <button onClick={() => addObject("Перегородка")}>
        Добавить перегородку
      </button>
    </div>
  );
};

export default ObjectList;
