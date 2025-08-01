//@ts-nocheck
import JobCard from "@/components/cards/job-card"
import data from "@/data"

export default function Search({ searchParams }) {
    const query = searchParams.q
    const jt = searchParams.jt
    const jr = searchParams.jr
    console.log(jt);

    const products = data.data
    let filterData=products
    if (query) {

        filterData = products.filter((job) => {
            if (job.job_title.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        })
    }
    if (jt) {

        filterData = filterData.filter((job) => {
            if (job.job_employment_type.toLowerCase() === jt.toLowerCase()) return true
        })
    }
     if (jr==="true") {

        filterData = filterData.filter((job) => {
            if (job.job_is_remote) return true
        })
    }

    return (
        <div>
            <div>

            </div>

            <div className="flex flex-wrap justify-center ">

                {
                    filterData.map((job, index) => {
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