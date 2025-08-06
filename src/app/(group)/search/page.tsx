
import JobCard from "@/components/cards/job-card"
import data from "@/data"
import prismaClient from "@/services/prisma"
import { Company, Job, User } from "@/generated/prisma"

type searchPageQuery = Promise<{
    q : string,
    jc : string,
    jt : string,
    page : string
}>

type Jobs = Job[];

export default async function Search({ searchParams } : {searchParams : searchPageQuery}) {
    const queries = await searchParams
    const query = queries.q || ""
    const jc = queries.jc || ""
    const jt = queries.jt || "";
    const page = queries.page || "1"
   
    

    const res = await fetch(`http://localhost:3000/api/search?q=${query}&jc=${jc}&jt=${jt}&page=${page}`)
    const data = await res.json();
    const jobs = data.data

    
   

    return (
        <div>
            <div>

            </div>

            <div className="flex flex-wrap justify-center ">

                {
                    jobs.map((job : Job & {
                        company : Company & {
                            owner : User
                        }
                    }, index : number) => {
                        return (
                            <div key={index} className="flex felx-col">
                                <div>
                                    <JobCard item={job} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}