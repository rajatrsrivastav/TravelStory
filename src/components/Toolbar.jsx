import React from 'react';
import {Image ,Type} from "lucide-react"
const Toolbar = ({ onAddText, onAddImage }) => {
  return (
    <div className='flex gap-3'>
        <button className=' border-1 rounded flex items-center justify-center' onClick={onAddText}>
        <Image size={20}/>Add Text
        </button>
        <button className=' border-1 rounded flex items-center justify-center' onClick={onAddImage}>
        <Type size={20}/>Add Image
        </button>
    </div>
  );
};

export default Toolbar;
