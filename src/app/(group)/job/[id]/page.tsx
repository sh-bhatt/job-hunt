// @ts-nocheck
import React from 'react'
import JobCard from '@/components/cards/job-card';
import { notFound } from 'next/navigation';
import EditDeleteJob from '@/components/edit-delete-job';
import ApplyBtn from '@/components/buttons/apply-btn';
import ViewApplicantsBtn from '@/components/buttons/view-applicants-btn';

export default async function JobPage({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/job/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!data.success) {
    notFound();
  }

  const job = data.data;

  return (
    <div>
      <JobCard item={job} />
      <div className="flex gap-6">
        <ApplyBtn job={job} />
        <ViewApplicantsBtn job={job} />
        <EditDeleteJob job={job} />
      </div>
    </div>
  );
}
