import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";

export async function GET(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;

    const q = searchParams.get("q") || "";
    const jc = searchParams.get("jc") || ""
    const jt = searchParams.get("jt") || ""
    const page = Number.parseInt(searchParams.get("page") || "1") 
    // const ms = searchParams.get("ms") || 0; 

    const limit = 10

    try{
        const data =await  prismaClient.job.findMany({
        where : {
            OR : [{
                title : {
                contains : q ,
                mode: "insensitive"
            }
            },
            {
                company : {
                    name : {
                        contains : q,
                        mode : "insensitive"
                    }
                }
            }
            ],
            
            job_category : {
                contains : jc,
                mode : "insensitive"
            },
            job_type : {
                contains : jt,
                mode : "insensitive"
            }
           
        },
        include:{
            company :{
                include : {
                    owner : true
                }
            }
        },
        take : 10,
        skip : (page - 1)*limit
    })

    return NextResponse.json({
        success : true,
        data : data
    })
    }catch(error){
        return NextResponse.json({
        success : false,
        data : []
    })
    }
    
}