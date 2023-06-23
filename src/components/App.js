import Board from "./Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ObjectList from "./ObjectList";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ObjectList />
      <Board />
    </DndProvider>
  );
}

export default App;
