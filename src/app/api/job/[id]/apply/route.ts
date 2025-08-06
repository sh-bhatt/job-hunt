//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest,{params}){
    console.log("ndujfb");
    
    const jobId = params.id;

    const user = await getUserFromCookies();

    if(!user){
        return NextResponse.json({
            success : false,
            message : "User unauthenticated"
        })
    }

    const applicationObj = {
        userId : user.id,
        jobId
    }

    try{
        const application = await prismaClient.application.create({
            data : applicationObj
        })

        return NextResponse.json({
            success : true,
            message : "application successfull",
            data : application
        })
    }catch(error){
         return NextResponse.json({
            success : false,
            message : "something went wrong"
        })
    }
}