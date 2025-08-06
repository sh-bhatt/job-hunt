import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){

    const user = await getUserFromCookies();
    if(!user){
        return NextResponse.json({
            success : false,
            message : "User not found"
        })
    }

   

    return NextResponse.json({
            success : true,
            message : "User found",
            user
        })

}