import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

export async function post(req: NextRequest) {

    const user = await currentUser();

    // if user already exist

    if (user) {
        const userData = await db.select().from(users)
        .where(eq(users.email, user.primaryEmailAddress?.emailAddress ?? ''))

        if(userData?.length > 0) {
            return NextResponse.json(userData[0])

        // if user dont exist create new user in db
        } else {
            const result = await db.insert(users).values({
                name: user.fullName ?? '',
                email: user.primaryEmailAddress?.emailAddress ?? '',
            }).returning();

            return NextResponse.json(result[0]);
        }
    }

    return NextResponse.json({ message: "user not found" }, { status: 404})

}