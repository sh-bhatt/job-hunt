//@ts-nocheck
"use client"
import React, { useContext } from 'react'
import { SavedJobsContext } from '../layout'
import JobCard from '@/components/cards/job-card'

export default function Saved() {
  const {savedJobs} = useContext(SavedJobsContext)
  return (
    <div>
      <h1>Your Saved Jobs:</h1>
      <div className='flex gap-10 flex-wrap'>
        {
        savedJobs.map(job => <JobCard key={job.id} item={job}/>)
        }
      </div>
      
    </div>
  )
}
