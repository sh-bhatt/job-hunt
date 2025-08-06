//@ts-nocheck

import JobCard from "@/components/cards/job-card";
import data from "@/data";


export default async function Home() {
  // const jobs = data.data

    const res = await fetch(`http://localhost:3000/api/search`)
    const data = await res.json();
    const jobs = data.data

  return (
      <main>
        
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {
          jobs.map(job => (
            <JobCard key={job.id} item={job}/>
          ))
        }
        </div>
        
      </main>
  );
}
