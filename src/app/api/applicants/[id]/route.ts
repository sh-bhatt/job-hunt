//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, {params}){

    const jobId = params.id;

    try{
        const res = await prismaClient.application.findMany({
            where  : {
                jobId
            },
            include : {
                user : true
            }
        })

        if(res){
            return NextResponse.json({
                success : true,
                message : "",
                data : res
            })
        }else{
            return NextResponse.json({
                success : false,
                message : "No applicants for this particular job"
            })
        }
    }catch(error){
        return NextResponse.json({
                success : false,
                message : "Something went wrong"
            })
    }
}