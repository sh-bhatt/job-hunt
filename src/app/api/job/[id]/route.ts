//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, {params}){
    const id = params.id;

    try{
        const job = await prismaClient.job.findUnique({
            where : {
                id
            },
            include : {
                company : {
                    include : {
                        owner : true
                    }
                }
            }
        })

        if(job){
            return NextResponse.json({
                success : true,
                data : job
            })
        }else{
            return NextResponse.json({
                success : false,
                data : {},
                message : "No job found"
            })
        }
    }catch(error){
        console.log(error.message);

        return NextResponse.json({
                success : false,
                message : "Something went wrong"
            })

    }
}

export async function DELETE(request : NextRequest,{params}){
    const jobId = params.id;

    try{
        const res = await prismaClient.job.delete({
            where : {
                id : jobId
            }
        })

        if(res){
            return NextResponse.json({
               success : true,
               message : "Job deleted successfully",
               data : res
            })
        }else{
            return NextResponse.json({
               success : false,
               message : "Job unable to delete"
            })
        }
    }catch(error){
        return NextResponse.json({
               success : false,
               message : "something went wrong"
            })
    }
}

export async function PATCH(request : NextRequest, {params}){
    const jobId = params.id;

    const body = await request.json();

    try{
        const res = await prismaClient.job.update({
            where : {
                id : jobId
            },
            data : body
        })

        return NextResponse.json({
            success : true,
            message : "Data updated successfully",
            data : res
        })
    }catch(error){
        return NextResponse.json({
            success : false,
            message : "Something went wrong"
        })
    }
}