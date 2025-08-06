import prismaClient from "@/services/prisma";
import { generateToken } from "@/services/jwt";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request : NextRequest){
    const body = await request.json();

    const userToCreate = {
        email : body.email,
        password : body.password
    }

    try{
        const user = await prismaClient.user.create({
            data : userToCreate
        })
        
        const tokenToCreate = {
            id : user.id
        }

        const token = generateToken(tokenToCreate)

        
        const res = NextResponse.json({
            success : true,
            data : user
    },{status : 201})
        
    res.cookies.set("token",token)
    return res;
    }catch(error){
        return NextResponse.json({
        success : false
    },{status : 500})
    }

}