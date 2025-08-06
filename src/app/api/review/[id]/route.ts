//@ts-nocheck
import prismaClient from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request : NextRequest, {params}){
    const companyId = params.id

    try{
        const reviews = await prismaClient.review.findMany({
            where : {
                companyId
            },
            include : {
                author : true
            }
        })

        return NextResponse.json({
            success : true,
            message : "Reviews found successfully",
            data : reviews
        })
    }catch(error){
        return NextResponse.json({
            success : false,
            message : "something went wrong"
        })
    }
}