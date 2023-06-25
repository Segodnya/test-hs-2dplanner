import React from "react";

const ObjectList = ({ addObject }) => {
  return (
    <div>
      <button onClick={() => addObject("Table")}>Add Table</button>
      <button onClick={() => addObject("Chair")}>Add Chair</button>
      <button onClick={() => addObject("Partition")}>Add Partition</button>
    </div>
  );
};

export default ObjectList;
