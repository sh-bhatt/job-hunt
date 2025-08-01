//@ts-nocheck

import JobCard from "@/components/cards/job-card";
import data from "@/data";
import Header from "@/components/header";

export default function Home() {
  const jobs = data.data

  return (
      <main>
        <Header/>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {
          jobs.map(job => (
            <JobCard key={job.job_id} item={job}/>
          ))
        }
        </div>
        
      </main>
  );
}
