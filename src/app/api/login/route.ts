//@ts-nocheck
import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    
    const body = await req.json();

    const user = await prismaClient.user.findUnique({
        where : {
            email : body.email
        }
    })

    if(user?.password == body?.password){
       const tokenToCreate = {
        id : user?.id
       }

       const token = generateToken(tokenToCreate);

        const res = NextResponse.json({
            success : true,
            user : user
        })

        res.cookies.set("token", token)

        return res
    }

    return NextResponse.json({
        success : false
    })
}