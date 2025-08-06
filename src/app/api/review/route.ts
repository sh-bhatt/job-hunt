//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    const body = await request.json();

    const user = await getUserFromCookies();

    if(!user){
        return NextResponse.json({
            success : false,
            message : ""
        })
    }

    try{
        const review = await prismaClient.review.create({
            data : {
                ...body,
                authorId : user.id
            }
        })

        return NextResponse.json({
            success : true,
            message : "review created successfully"
        })
    }catch(error){
        return NextResponse.json({
            success : false,
            message : "something went wrong"
        })
    }
}

