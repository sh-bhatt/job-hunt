//@ts-nocheck
'use client';

import { Card, Flex, Box, Text, Badge, Button } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import SaveJobBtn from '../buttons/saveJobBtn';
import { Job, Company, User } from '@/generated/prisma';

type job = Job & {
  company: Company & {
    owner: User;
  };
};

export default function JobCard({ item }: { item: job }) {
  return (
    <div className="m-4">
      <Box>
        <Card className="w-[26em] h-fit bg-black text-white border border-white rounded-2xl shadow-lg p-5">
          <Flex direction="column" gap="4">
            <Text as="h2" className="text-xl font-bold text-center line-clamp-1">
              {item.title}
            </Text>

            <Box>
              <Text className="text-sm text-gray-300 line-clamp-4">{item.description}</Text>
            </Box>

            <Flex direction="column" gap="2" className="text-sm">
              <Text>
                <span className="font-semibold">Location:</span> {item.location}
              </Text>
              <Text>
                <span className="font-semibold">Salary:</span> ₹{item.salary.toLocaleString()}
              </Text>
              <Text>
                <span className="font-semibold">Job Type:</span> {item.job_type}
              </Text>
              <Text>
                <span className="font-semibold">Category:</span> {item.job_category}
              </Text>
            </Flex>

            <Flex justify="between" align="center" mt="2">
              <Link href={`/job/${item.id}`}>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  View Details
                </Button>
              </Link>
              <SaveJobBtn job={item} />
            </Flex>

            <Flex direction="column" align="end" mt="4" className="text-xs text-gray-400">
              <Link href={`/company/${item.company.id}`} className="hover:underline">
                {item?.company?.name}
              </Link>
              <Text>{item.company.owner.email}</Text>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
