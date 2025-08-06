//@ts-nocheck
import React from 'react'
import DeleteCompanyBtn from '@/components/buttons/deleteCompanyBtn';
import JobCard from '@/components/cards/job-card';
import CompanyReviewsJobsContainer from '@/components/comany-listings-reviews';

export default async function CompanyPage({ params }) {
    const id = params.id

    const res = await fetch(`http://localhost:3000/api/company/${id}`)
    const data = await res.json();
    const company = data.data;
    const owner = company.owner;

    const res2 = await fetch(`http://localhost:3000/api/review/${id}`)
    const data2 = await res2.json();
    const reviews = data2.data

    console.log(company.jobs);
    

    return (
        <div>
           <div className="p-6 bg-black rounded-xl shadow-md max-w-2xl mx-auto mt-6">
  <h2 className="text-2xl font-semibold text-white mb-4">Company Details</h2>
  
  <div className="space-y-3">
    <h1 className="text-xl font-bold text-white">{company.name}</h1>
    <p className="text-gray-300">{company.description}</p>
    <h2 className="text-sm text-gray-400">Owner: {owner.email}</h2>

    <div className="mt-4">
      <DeleteCompanyBtn companyId={id} />
    </div>
  </div>
</div>


            <CompanyReviewsJobsContainer company={company} reviews={reviews}/>
        </div>

    )
}
