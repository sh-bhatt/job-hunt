import prismaClient from '@/services/prisma'
import React from 'react'

export default async function CompanyPage() {
    const companies = await prismaClient.company.findMany({
        include:{
            owner : true
        }
    });
  return (
    <div className='flex flex-wrap gap-6'>{
            companies?.map(company =>(
                <div key={company.id} className='border border-white p-4'>
                    <h1>{company.name}</h1>
                    <p>{company.description}</p>
                    <h2>{company.owner.email}</h2>
                </div>
                
            ))
        }
    </div>
  )
}
