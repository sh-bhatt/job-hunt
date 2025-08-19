"use client"
import { Job } from '@/generated/prisma'
import React, { useState } from 'react'

export default function AddJobPage() {
    const [jobTitle, setJobTitle] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobLocation, setJobLocation] = useState("")
    const [jobSalary, setJobSalary] = useState("")
    const [jobType, setJobType] = useState("")
    const [jobCategory, setJobCategory] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(){
        setLoading(true)

        const salaryNum = Number.parseInt(jobSalary)

        //@ts-ignore
        const data : Job = {
            title : jobTitle,
            description : jobDescription,
            salary : salaryNum,
            job_category : jobCategory,
            job_type : jobType,
            location : jobLocation

        }

        const res = await fetch("http://localhost:3000/api/job", {
            method : "POST",
            body : JSON.stringify(data)
        })
        
        const resData = await res.json();
        if(resData){}
    }
    
  return (
    <div>AddJobPage</div>
  )

}
