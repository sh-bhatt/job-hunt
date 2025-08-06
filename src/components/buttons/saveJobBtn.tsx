//@ts-nocheck
"use client"
import React, { useEffect } from 'react'
import { SavedJobsContext } from '@/app/(group)/layout'
import { useContext } from 'react'
import { Button } from '@radix-ui/themes'
import { useState } from 'react'

export default function SaveJobBtn({job}) {
    const {savedJobs,setSavedJobs} = useContext(SavedJobsContext);
    const [isSaved,setIsSaved] = useState(false);

    useEffect(()=>{
        
        
        const ifJobSaved = [...savedJobs].find(elem => elem.id == job.id);
        if(ifJobSaved) setIsSaved(true);
    },[savedJobs])

    function handleSave(){

        
        const updatedArray = [...savedJobs, job];
          
        localStorage.setItem("savedJobs",JSON.stringify(updatedArray))
        setSavedJobs(updatedArray);
        setIsSaved(true);
        
    }

    function handleUnsave(){
        const updatedArray = savedJobs?.filter((elem) => (elem.id != job.id))
        localStorage.setItem("savedJobs",JSON.stringify(updatedArray))
        setSavedJobs(updatedArray);
        setIsSaved(false);
    }

  return (
    <div>
        {
            isSaved ? <Button onClick={()=>handleUnsave()}>Unsave</Button> : <Button onClick={()=>handleSave()}>Save</Button>
        }
    </div>
    
  )
}
