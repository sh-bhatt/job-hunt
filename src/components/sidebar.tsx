//@ts-nocheck
"use client";
import { Card, RadioGroup } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const jt = searchParams.get("jt") || "";
  const jr = searchParams.get("jr") || "";

  const [jobType, setJobType] = useState(jt);
  const [jobRemote, setJobRemote] = useState(jr);

  function handleJobTypeChange(value) {
    setJobType(value);

    let url = `/search?q=${query}`;
    if (value) url += `&jt=${value}`;
    if (jobRemote) url += `&jr=${jobRemote}`;

    router.push(url);
  }

  function handleRemoteChange(value) {
    setJobRemote(value);

    let url = `/search?q=${query}`;
    if (jobType) url += `&jt=${jobType}`;
    if (value) url += `&jr=${value}`;

    router.push(url);
  }

  return (
    <aside>
      <Card className="w-60 h-50 m-2">
        <Card className="m-2">Job Type</Card>
        <RadioGroup.Root
          value={jobType}
          onValueChange={handleJobTypeChange}
          name="job-type"
        >
          <RadioGroup.Item value="">All</RadioGroup.Item>
          <RadioGroup.Item value="FULLTIME">FULL TIME</RadioGroup.Item>
          <RadioGroup.Item value="PARTTIME">PART TIME</RadioGroup.Item>
        </RadioGroup.Root>
      </Card>

      <Card className="w-60 h-50 m-2">
        <Card className="m-2">Remote Job</Card>
        <RadioGroup.Root
          value={jobRemote}
          onValueChange={handleRemoteChange}
          name="job-remote"
        >
          <RadioGroup.Item value="">All</RadioGroup.Item>
          <RadioGroup.Item value="true">Remote Jobs</RadioGroup.Item>
        </RadioGroup.Root>
      </Card>
    </aside>
  );
}