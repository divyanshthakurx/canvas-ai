/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import dynamic from "next/dynamic";
import { toast } from "@/components/ui/toast";
import "@excalidraw/excalidraw/index.css"
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

// Dynamically import Excalidraw and disable SSR
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

const Whiteboard = () => {

  const [excalidrawAPi, setExcalidrawAPI] = useState(null);
  const saveTimeRef = useRef<any>(null);
  const projectid = useParams();
  
  const handleCanvasChange = (elements: readonly any[], appState: any, files: any) => {
    // clear timer if change made
    if (saveTimeRef?.current) {
      clearTimeout(saveTimeRef.current)
    }

    // start new 10s timer
    saveTimeRef.current = setTimeout(() => {
      // save method
      saveCanvasChanges(elements, appState, files);
      toast.add({
        title: "Changes Saved!",
        type: "success"
      })
    }, 10000)
  }

    const saveCanvasChanges = async (elements: readonly any[], appState: any, files: any) => {
    const response = await axios.post('/api/whiteboards', {
      elements: elements,
      appState: appState,
      files: files,
      projectId: projectid.projectid
    })
    } 
  
  return (
    <>  
      <div>Whiteboard</div>
      <div style={{ height: "950px" }}>
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={handleCanvasChange}
          
        />
      </div>
    </> 
  )
}

export default Whiteboard