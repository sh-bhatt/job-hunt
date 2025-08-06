
"use client"
import prismaClient from "@/services/prisma";
import Header from "@/components/header";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { Company, Job, User } from "@/generated/prisma";
import { useRouter } from "next/navigation";

export const UserContext = createContext<{
    user?: User & {company : Company} | null,
    setUser? : (value : User & {company : Company})=> void
}>({ });

export const SavedJobsContext = createContext<{
    savedJobs? : Job[],
    setSavedJobs? : (value : Job[])=>void
}>({ })

export default function Layout({ children } : {
    children : ReactNode
}) {
    const [user, setUser] = useState<User & {company : Company} | null>(null)
    const [savedJobs, setSavedJobs] = useState<Job[]>([])
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const res = await fetch("/api/current-user");
            const data = await res.json();

            console.log("lay",data.user);

            if (data.success) {
                setUser(data.user)
            }else{
                router.push("/login")
            }
        }
        getUser();

        function getSavedJobsFromLocalStorage() {
           

            const jobsInLocalStorage = localStorage.getItem("savedJobs");
            const parsedJobs = jobsInLocalStorage ? JSON.parse(jobsInLocalStorage) : [];

           
            setSavedJobs(parsedJobs);
        }

        getSavedJobsFromLocalStorage();
    }, [])


    

    return (
        <div>
            <UserContext.Provider value={{ user, setUser}}>
                <SavedJobsContext.Provider value={{ savedJobs, setSavedJobs }}>
                    <Header />
                    {children}
                </SavedJobsContext.Provider>
            </UserContext.Provider>
        </div>
    )
}