//@ts-nocheck
"use client";
import { Card, RadioGroup } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@radix-ui/themes";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const jc = searchParams.get("jc");
  const jt = searchParams.get("jt");

  const [jobCategory, setJobCategory] = useState(jc || "");
  const [jobType, setJobType] = useState(jt || "");
 

  function handleFilter(){
    const url = `/search?q=${query}&jc=${jobCategory}&jt=${jobType}`
    router.push(url)
  }
//   function handleJobCategoryChange(value) {
//     setJobCategory(value);

//     let url = `/search?q=${query}`;
//     if (value) url += `&jc=${value}`;
    

//     router.push(url);
//   }

//   function handleJobTypeChange(value) {
//     setJobType(value);

//     let url = `/search?q=${query}`;
//     if (value) url += `&jt=${value}`;

//     router.push(url);
//   }

  return (
    <aside>
      <Card className="w-60 h-50 m-2">
        <Card className="m-2">Job Category</Card>
        <RadioGroup.Root
          value={jobCategory}
          onValueChange={setJobCategory}
          name="job-category"
        >
          <RadioGroup.Item value="">All</RadioGroup.Item>
          <RadioGroup.Item value="fulltime">FULL TIME</RadioGroup.Item>
          <RadioGroup.Item value="Contractor">Contractor</RadioGroup.Item>
        </RadioGroup.Root>
      </Card>

      <Card className="w-60 h-50 m-2">
        <Card className="m-2">Job Type</Card>
        <RadioGroup.Root
          value={jobType}
          onValueChange={setJobType}
          name="job-type"
        >
          <RadioGroup.Item value="">All</RadioGroup.Item>
          <RadioGroup.Item value="remote">Remote Jobs</RadioGroup.Item>
          <RadioGroup.Item value="on-site">On-site Jobs</RadioGroup.Item>
        </RadioGroup.Root>
      </Card>
      <Button onClick={handleFilter}>Filter</Button>
    </aside>
  );
}