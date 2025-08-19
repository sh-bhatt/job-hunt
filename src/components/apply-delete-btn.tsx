import { useState } from "react";
import ApplyBtn from "./buttons/apply-btn";

export default function ApplyDeleteButton({hasApplied,job}){
    const [userHasApplied,setUserHasApplied] = useState(hasApplied);

    async function handleDeleteApplication(){
        try {
            const res = await fetch("/api/job/apply/"+Job.id,{
                method : "DELETE"
            });
            const data = await res.json();

            if(data.success) {
                setUserHasApplied(false)
            } else{
                alert("Failed to delete the application")
            }
        } catch (error) {
            alert("Failed to delete the application")
        }
    }
    return(
        <div>
            {!userHasApplied && <ApplyBtn job={job}/>}
        </div>
    )

}