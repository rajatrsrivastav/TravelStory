import React, { useRef } from "react";
import CanvasEditor from "./components/CanvasEditor";
import { Save } from "lucide-react";

function App() {
  const canvasRef = useRef();

  const handleSave = () => {
    canvasRef.current.saveCanvasAsImage();
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-lg font-bold text-gray-900">TravelStory</h1>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1"
        >
          <Save size={15} />
          Save
        </button>
      </div>
      <CanvasEditor ref={canvasRef} />
    </div>
  );
}

export default App;
