import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import SaveButton from "./SaveButton";
import ImportDropzone from "./ImportDropzone";

const initialObjects = [
  { id: 1, label: "Table", left: 50, top: 50 },
  { id: 2, label: "Chair", left: 150, top: 150 },
  { id: 3, label: "Partition", left: 250, top: 250 },
];

const Board = () => {
  const [objects, setObjects] = useState(initialObjects);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "object",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x + 25);
      const top = Math.round(item.top + delta.y + 25);
      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.id === item.id ? { ...obj, left, top } : obj
        )
      );
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleImport = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result;
      const parsed = JSON.parse(json);
      setObjects(parsed);
    };
    reader.readAsText(acceptedFiles[0]);
  };

  const ObjectItem = ({ obj }) => {
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
    return (
      <div
        ref={drag}
        style={{
          position: "absolute",
          left: obj.left,
          top: obj.top,
          border: "1px solid black",
          width: "50px",
          height: "50px",
          cursor: "move",
          opacity,
        }}
      >
        {obj.label}
      </div>
    );
  };

  return (
    <div>
      <div
        ref={drop}
        style={{
          width: "500px",
          height: "500px",
          border: "1px solid black",
          position: "relative",
        }}
      >
        {objects.map((obj) => (
          <ObjectItem key={obj.id} obj={obj} />
        ))}
      </div>
      <div>
        <SaveButton objects={objects} />
        <ImportDropzone onImport={handleImport} />
      </div>
    </div>
  );
};

export default Board;
