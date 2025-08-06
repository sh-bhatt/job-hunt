//@ts-nocheck
"use client"

import React from 'react'
import { Button } from '@radix-ui/themes'

export default function ApplyBtn({job}) {

    async function handleApply(){
        const jobId = job.id;
        console.log(jobId);
        
        try{
            const res = await fetch(`/api/job/${jobId}/apply`);

            const data = await res.json();

            if(data.success){
                alert("your application is successfull!")
            }else{
                alert("Something went wrong")
            }
        }catch(error){
            console.log(error.message);
            alert("something went wrong")
            
        }
        
    }
  return (
    <Button onClick={handleApply}>Apply</Button>
  )
}
