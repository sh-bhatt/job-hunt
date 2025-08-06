//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/helper";

export async function GET(request : NextRequest, {params}){

    const id = params.id;

    const company = await prismaClient.company.findUnique({
        where : {
            id
        },
        include:{
            owner : true,
            jobs : {
                include : {
                    company : {
                        include : {
                            owner : true
                        }
                    }
                }
            }
        }
    })

  
    

    return NextResponse.json({
        success : true,
     
        data : company
    })
}



export async function DELETE(request: NextRequest,{params}) {
    const companyId = params.id
    const user = await getUserFromCookies();
       
    
    // const company = await prismaClient.company.findUnique({
    //     where: { 
    //         id: companyId 
    //     },
        
    // });

    if (user?.company?.id === companyId) {
        const deleted = await prismaClient.company.delete({
            where: { id: companyId }
        });

        // console.log(deleted);
        

        return NextResponse.json({
            success: true,
            data: deleted,
            message : "Company deleted successfully"
        });
    }

    return NextResponse.json({
        success: false,
        message: "Unauthorized or company not found",
        data : {}
    });
}