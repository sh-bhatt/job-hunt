import { useState } from "react";
import ApplyBtn from "./buttons/apply-btn";

type ApplyDeleteButtonProps = {
  hasApplied: boolean;
  job: {
    id: string;
    title?: string; // add more fields if needed
  };
};

export default function ApplyDeleteButton({ hasApplied, job }: ApplyDeleteButtonProps) {
  const [userHasApplied, setUserHasApplied] = useState(hasApplied);

  async function handleDeleteApplication() {
    try {
      const res = await fetch(`/api/job/apply/${job.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setUserHasApplied(false);
      } else {
        alert("Failed to delete the application");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete the application");
    }
  }

  return (
    <div>
      {userHasApplied ? (
        <button
          onClick={handleDeleteApplication}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Withdraw Application
        </button>
      ) : (
        <ApplyBtn job={job} />
      )}
    </div>
  );
}
