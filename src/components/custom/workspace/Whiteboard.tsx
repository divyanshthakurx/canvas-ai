'use client'

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css"

const Whiteboard = () => {

  const handleCanvasChange = () => {
    
  }
  
  return (
    <>
      <div>Whiteboard</div>
      <div style={{ height: "900px" }}>
        <Excalidraw onChange={handleCanvasChange} />
      </div>
    </> 
  )
}

export default Whiteboard