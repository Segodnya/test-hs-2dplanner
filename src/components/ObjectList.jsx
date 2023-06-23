import React from "react";

const objects = [
  { id: 1, label: "Table" },
  { id: 2, label: "Chair" },
  { id: 3, label: "Partition" },
];

export default function ObjectList() {
  return (
    <div>
      <h2>Object List</h2>
      <ul>
        {objects.map((object) => (
          <li key={object.id}>{object.label}</li>
        ))}
      </ul>
    </div>
  );
}
