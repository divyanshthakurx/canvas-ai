import { db } from "@/db";
import { boards } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

  const { projectName, projectId } = await req.json();

  if (!projectName || !projectId) {
    return NextResponse.json({
      error: "project details missing"
    })
  }

  const user = await currentUser();
  
  if (user) {
    const result = await db.insert(boards).values({
      projectId: projectId,
      projectName: projectName,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? ""
    }).returning();
    
    return NextResponse.json(result[0]);
    
  }
}