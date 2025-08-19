//@ts-nocheck
'use client';

import { Card, Flex, Box, Text, Button } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import SaveJobBtn from '../buttons/saveJobBtn';
import { Job, Company, User } from '@/generated/prisma';

type job = Job & {
  company: Company & {
    owner: User;
  };
};

export default function JobCard({ job }: { job: job }) {
  return (
    <div className="m-4">
      <Box>
        <Card className="w-[26em] h-fit bg-black text-white border border-white rounded-2xl shadow-lg p-5">
          <Flex direction="column" gap="4">
            <Text as="h2" className="text-xl font-bold text-center line-clamp-1">
              {job.title}
            </Text>

            <Box>
              <Text className="text-sm text-gray-300 line-clamp-4">{job.description}</Text>
            </Box>

            <Flex direction="column" gap="2" className="text-sm">
              <Text>
                <span className="font-semibold">Location:</span> {job.location}
              </Text>
              <Text>
                <span className="font-semibold">Salary:</span> ₹{job.salary.toLocaleString()}
              </Text>
              <Text>
                <span className="font-semibold">Job Type:</span> {job.job_type}
              </Text>
              <Text>
                <span className="font-semibold">Category:</span> {job.job_category}
              </Text>
            </Flex>

            <Flex justify="between" align="center" mt="2">
              <Link href={`/job/${job.id}`}>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  View Details
                </Button>
              </Link>
              <SaveJobBtn job={job} />
            </Flex>

            <Flex direction="column" align="end" mt="4" className="text-xs text-gray-400">
              <Link href={`/company/${job.company.id}`} className="hover:underline">
                {job?.company?.name}
              </Link>
              <Text>{job.company.owner.email}</Text>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
