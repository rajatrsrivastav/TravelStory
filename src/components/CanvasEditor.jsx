import React,{useState} from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';

const CanvasComponent = () => {
  const [text,setText]=useState([
    {
      id: 'text1',      // unique identifier
      text: 'My Travel Story',  // initial text content
      x: 100,           // initial x position on canvas
      y: 80,            // initial y position on canvas
      fontSize: 24,     // default font size
      fill: '#333',     // font color
      draggable: true   
    }
  ])
  return (
      <div className="border-1 border-black p-2"> 
        <Stage
          width={window.innerWidth * 0.95} 
          height={window.innerHeight * 0.9} 
        >
          <Layer>
          <Text
            text="My Travel Story"
            x={100}
            y={80}
            fontSize={24}
            fill="black"
            draggable
          />
          </Layer>
        </Stage>
      </div>
  );
};

export default CanvasComponent;
