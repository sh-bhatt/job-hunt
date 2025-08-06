import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request : NextRequest){

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    
    if(!query){
        return NextResponse.json({
            success : true,
            suggestions : []
        })
    }

    const sugg = await prismaClient.job.findMany({
        where : {
            title : {
                contains : query,
                mode : "insensitive"
            }
        },
        select : {
            title : true,
            id : true
        },
        take : 10
    })

    return NextResponse.json({
            success : true,
            suggestions : sugg
        })
}