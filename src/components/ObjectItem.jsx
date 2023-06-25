import React from "react";
import { useDrag } from "react-dnd";

const ObjectItem = ({ obj, deleteMode, deleteObject }) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: "object",
    item: {
      id: obj?.id,
      label: obj?.label,
      left: obj?.left,
      top: obj?.top,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const handleClick = () => {
    if (deleteMode) {
      deleteObject(obj.id);
    }
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      style={{
        position: "absolute",
        left: obj.left,
        top: obj.top,
        border: "1px solid black",
        width: "50px",
        height: "50px",
        cursor: deleteMode ? "pointer" : "move",
        opacity,
      }}
    >
      {obj.label}
    </div>
  );
};

export default ObjectItem;
