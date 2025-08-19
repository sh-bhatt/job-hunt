//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/helper";

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





export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const user = await getUserFromCookies();

    if (!user || !id) {
      return NextResponse.json({ success: false, message: "Unauthorized or invalid job id" }, { status: 400 });
    }

    await prismaClient.application.delete({
      where: {
        userId_jobId: {  // composite unique key
          userId: user.id,
          jobId: id,
        },
      },
    });

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
  }
}
