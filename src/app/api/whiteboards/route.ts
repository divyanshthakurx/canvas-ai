import { db } from "@/db";
import { whiteBoards } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, elements, appState, files } = await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorised User")
  }

  if (projectId) {
    try {const result = await db.insert(whiteBoards).values({
      projectId: projectId,
      elements: elements,
      appState: appState,
      files: files
    }).onConflictDoUpdate({
      target: whiteBoards.projectId,
      set: {
        elements: elements,
        appState: appState,
        files: files,
        updatedAt: new Date()
      }
    })
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({msg: "Internal server error", err: error})
    }
  }

    return NextResponse.json("project information missing!");
}