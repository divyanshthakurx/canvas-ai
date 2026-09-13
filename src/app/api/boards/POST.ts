import { db } from "@/db";
import { boards } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";




export async function POST(req: NextRequest) {

  const { projectName, projectId } = await req.json();

  const user = await currentUser();

  if (user) {
    const result = await db.insert(boards).values({
      projectId: projectId,
      projectName: projectName ?? "",
      userEmail: user?.primaryEmailAddress?.emailAddress ?? ""
    });
  }

}
