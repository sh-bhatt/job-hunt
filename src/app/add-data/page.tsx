//@ts-nocheck
import React from 'react'
import data from '@/data'
import prismaClient from '@/services/prisma'

export default function AddData() {
    async function addData(){
        "use server"
        const newData = data.data.map(elem => {
            return({
                title : elem.job_title,
                description : elem.job_description,
                salary : 50000,
                location : elem.job_location,
                job_category : elem.job_employment_type,
                job_type : "remote"
            })
        })

        const res =  await prismaClient.job.createMany({
            data : newData
        })
    }
  return (
    <form onSubmit={addData}>
        <button>Save</button>
    </form>
  )
}
