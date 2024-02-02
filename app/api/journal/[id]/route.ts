import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request, {params}) =>{
    const { content } = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },

        data: {
            content,
        },
    })

    const analyis = await analyze (updatedEntry.content)
    const updated = await prisma.analysis.upsert({
    where:{
        entryId: updatedEntry.id,
    },
    data: {
        entryId: updatedEntry.id,
        ...analyis,

    },
    update: analyis,
    })

    console.log(updated)

    return NextResponse.json({ data: updatedEntry})
}