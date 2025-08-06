import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    console.log("abcd");
    
    const body = await req.json();
    console.log(body);
    
    try{
        const job = await prismaClient.job.create({
            data : body
        })
        console.log(job);
        
        return NextResponse.json({
        success : true,
        data : job,
        message : "job created suucessfully"
    })
    }catch(err){
        return NextResponse.json({
            success: false,
            message : "something went wronng"
        })
    }
    
}