import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

export async function POST(request : NextRequest){
    // const cookie = request.cookies.get("token")?.value

    const user = await getUserFromCookies();

    if(!user){
        return NextResponse.json({
            success : false,
            message : "Unauthorized"
        })
    }

    const body = await request.json();

    const company = {
        name : body.name ,
        description : body.description,
        ownerId : user.id

    }
    try{
        const newCompany = await prismaClient.company.create({
            data : company
        })

        return NextResponse.json({
            success : true,
            message : "Company created successfully",
            data : newCompany
        })
    }catch(error){
        return NextResponse.json({
            success : false,
            message : "Failed to create company"
        })
    }

}