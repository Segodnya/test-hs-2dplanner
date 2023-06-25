import React from "react";
import { useDrag } from "react-dnd";

const ObjectItem = ({ obj, deleteMode, deleteObject }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "object",
    item: { id: obj.id, left: obj.left, top: obj.top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid black",
        backgroundColor: deleteMode ? "red" : "white",
        opacity: isDragging ? 0.5 : 1,
        position: "absolute",
        left: obj.left,
        top: obj.top,
        width: "50px",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        cursor: "move",
      }}
      onClick={() => deleteMode && deleteObject(obj.id)}
    >
      {obj.label}
    </div>
  );
};

export default ObjectItem;
