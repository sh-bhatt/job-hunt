//@ts-nocheck
import React from 'react'
import JobCard from '@/components/cards/job-card';
import { notFound } from 'next/navigation';
import EditDeleteJob from '@/components/edit-delete-job';
import ApplyBtn from '@/components/buttons/apply-btn';
import ViewApplicantsBtn from '@/components/buttons/view-applicants-btn';
import { getUserFromCookies } from '@/helper';
import prismaClient from '@/services/prisma';
import { NextResponse } from 'next/server';

export default async function JobPage({params}) {

    const {id} = await params;
    const res = await fetch(`http://localhost:3000/api/job/${id}`);
    const data = await res.json();

    console.log(data);
    
    if(!data.success){
        notFound();
    }

    const job = data.data

  return (
    <div>
      <JobCard item={job} />
   <div className="flex gap-6">
  
  <ApplyBtn job={job} />
  <ViewApplicantsBtn job={job} />
  <EditDeleteJob job={job} />
</div>
</div>

  )

  export async function DELETE(req,{params}){
    const {id} = await params
    const user = await getUserFromCookies()
    const jobId = id;
    if(user&& jobId)

    try {
      
      const application = await prismaClient.application.delete({
        where: {
          userId:user.id,
          jobId:id
        }
      })

      return NextResponse.json({
        success : false,
        data : {
          message: "failed"
        }
      })


    } catch (error) {
      return sendCustomResp(false,{message:"failed"})
    }
  }
}
