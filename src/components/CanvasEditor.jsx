import React, { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Rect } from "react-konva";
import Toolbar from "./Toolbar";

const CanvasEditor = React.forwardRef((props, ref) => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isTextAdding, setIsTextAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = new window.Image();
      image.src = reader.result;
      image.onload = () => {
        setImages([
          ...images,
          { image: image, x: 100, y: 100 },
        ]);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleAddText = () => {
    if (newText.trim()) {
      setTexts([...texts, { text: newText, x: 100, y: 100 }]);
      setNewText("");
      setIsTextAdding(false);
    }
  };

  const saveCanvasAsImage = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = "canvas-image.png";
    link.click();
  };

  React.useImperativeHandle(ref, () => ({
    saveCanvasAsImage,
  }));

  return (
    <div className="h-screen">
      <div className="border-2 border-black p-2 shadow-lg rounded-md bg-white">
        <Stage width={window.innerWidth} height={window.innerHeight * 0.8} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight * 0.8}
              fill="#fff"
              listening={false}
            />
            {images.map((img, index) => (
              <KonvaImage
                key={index}
                image={img.image}
                x={img.x}
                y={img.y}
                draggable
              />
            ))}
            {texts.map((txt, index) => (
              <Text
                key={index}
                text={txt.text}
                x={txt.x}
                y={txt.y}
                fontSize={24}
                fill="black"
                draggable
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <Toolbar
        onAddImage={() => fileInputRef.current.click()}
        onAddText={() => setIsTextAdding(true)}
      />

      {isTextAdding && (
        <div style={{ position: "absolute", top: 100, left: 100 }}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleAddText}
            onKeyDown={(e) => e.key === "Enter" && handleAddText()}
            placeholder="Enter text"
            style={{ fontSize: "18px" }}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
});

export default CanvasEditor;
