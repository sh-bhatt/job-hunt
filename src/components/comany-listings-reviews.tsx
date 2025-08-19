//@ts-nocheck
"use client"
import { Tabs, Text, Box, Button, TextArea, Card, Badge } from '@radix-ui/themes'
import React, { useContext, useState } from 'react'
import JobCard from './cards/job-card'
import { Company, Review, User, Job } from '@/generated/prisma'
import { UserContext } from '@/app/(group)/layout'

export default function CompanyReviewsJobsContainer({ company, reviews }: {
    company: Company & { jobs: Job[] },
    reviews: (Review & { author: User })[]
}) {
    const [content, setContent] = useState<string>("")
    const [reviewList, setReviewList] = useState(reviews)
    const { user } = useContext<User>(UserContext)

    async function handleAdd() {
        const reviewObj = {
            content,
            companyId: company.id
        }

        const res = await fetch("/api/review", {
            method: 'POST',
            body: JSON.stringify(reviewObj)
        })

        const data = await res.json()

        if (data.success) {
            alert("Review added successfully!")
            const newReview = {
                ...reviewObj,
                author: { email: user.email },
                id: Date.now().toString()
            }
            setReviewList([newReview, ...reviewList])
            setContent("")
        }
    }

    return (
        <Tabs.Root defaultValue="job-openings">   {/* ✅ fixed default tab */}
            <Tabs.List>
                <Tabs.Trigger value="job-openings">Job Openings</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Top Reviews</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="job-openings">
                    <h2 className="text-lg font-semibold mb-2">Openings:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {company.jobs.length > 0 ? (
                            company.jobs.map(job => <JobCard key={job.id} item={job} />)
                        ) : (
                            <Text>No jobs available right now.</Text>
                        )}
                    </div>
                </Tabs.Content>

                <Tabs.Content value="reviews">
                    <div>
                        <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Post a review…" />
                        <Button className='m-4' onClick={handleAdd}>Add</Button>
                    </div>

                    <div className='mt-10 space-y-4'>
                        {reviewList.map(elem => (
                            <Card key={elem.id} className="p-4">
                                <Badge>{elem.author.email}</Badge>
                                <p>{elem.content}</p>
                            </Card>
                        ))}
                    </div>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    )
}
