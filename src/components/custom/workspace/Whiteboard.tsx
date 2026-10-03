/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import dynamic from "next/dynamic";
import { toast } from "@/components/ui/toast";
import "@excalidraw/excalidraw/index.css"
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import "./whiteboard.css"
import { ArrowRight, Circle, Diamond, Eraser, Hand, Minus, MousePointer2, Pencil, Square, Type, Image, FlashlightIcon } from "lucide-react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

const tools = [
  {
    name: 'selection',
    icon: MousePointer2,
    color: "text-purple-400"
  },
  {
    name: 'hand',
    icon: Hand,
    color: "text-green-500"
  },
  {
    name: 'rectangle',
    icon: Square,
    color: "text-blue-400"
  },
  {
    name: 'ellipse',
    icon: Circle,
    color: "text-yellow-500"
  },
  {
    name: 'diamond',
    icon: Diamond,
    color: "text-blue-800"
  },
  {
    name: 'arrow',
    icon: ArrowRight,
    color: "text-violet-700"
  },
  {
    name: 'line',
    icon: Minus,
    color: "text-pink-500"
  },
  {
    name: 'freedraw',
    icon: Pencil,
    color: "text-orange-500"
  },
  {
    name: 'text',
    icon: Type,
    color: "text-indigo-500"
  },
  {
    name: 'image',
    icon: Image,
    color: "text-cyan-500"
  },
  {
    name: 'laser',
    icon: FlashlightIcon,
    color: "text-red-500"
  },
  {
    name: 'eraser',
    icon: Eraser,
    color: "text-grey-500"
  }
]

// Dynamically import Excalidraw and disable SSR
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

const Whiteboard = () => {

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const saveTimeRef = useRef<any>(null);
  const projectid = useParams();
  const [activeTool, setActiveTool] = useState('selection');

  // custon tools
  const changeTool = (tool:any) => {
    if (!excalidrawAPI) return;

    setActiveTool(tool);
    excalidrawAPI.setActiveTool({
      type: tool
    })
  }

  const handleCanvasChange = (elements: readonly any[], appState: any, files: any) => {
    // clear timer if change made
    if (saveTimeRef?.current) {
      clearTimeout(saveTimeRef.current)
    }

    // start new 10s timer
    saveTimeRef.current = setTimeout(() => {
      // save method
      // saveCanvasChanges(elements, appState, files);
      // toast.add({
      //   title: "Changes Saved!",
      //   type: "success"
      // })
    }, ) // 10000 add it
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
      <div style={{ height: "980px" }}>
        <Excalidraw
          initialData={{
            appState: {
              activeTool: {
                type: "selection",
                locked: true,
                lastActiveTool: null,
                customType: null  
              }
            }
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={handleCanvasChange}
        />
      </div>
      <div className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-1 rounded-2xl bg-white border p-1.5 shadow-xl">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              className={`flex justify-center items-center rounded-xl transition h-10 w-10 hover:bg-primary/10 hover:cursor-pointer ${activeTool == tool.name ? "bg-primary/10" : null}`}
              key={`${tool.name}`}
              onClick={() => changeTool(tool.name)}
            >
              <Icon size="19" className={`${tool.color}`} />
            </button>
          )
        })}
      </div>
    </>
  )
}

export default Whiteboard
