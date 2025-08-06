
"use client"
import React, { useContext, useState } from 'react'
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { UserContext } from '@/app/(group)/layout'
import { Company, Job, User } from '@/generated/prisma'

export default function EditDeleteJob({ job } : {job : Job & {company : Company}}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("0")
    const [job_category, setJobCategory] = useState("")
    const [job_type, setJobType] = useState("")
    const {user  } = useContext(UserContext);

    async function handleDelete() {
        const res = await fetch(`/api/job/${job.id}`, {
            method: "DELETE"
        })

        const data = await res.json();

        if (data.success) {
            alert("Job deleted succesfully")
        }
    }

    if (user?.company?.id == job?.company?.id) {
        return (
            <div className='flex gap-2'>
                <Button color='red' onClick={handleDelete}>Delete</Button>
                <div>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button>Update</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Update Job</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Make changes to job
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Title
                                    </Text>
                                    <TextField.Root value={title} onChange={(e) => setTitle(e.target.value)}

                                        placeholder="Enter title"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Description
                                    </Text>
                                    <TextField.Root value={description} onChange={(e) => setDescription(e.target.value)}

                                        placeholder="Enter description"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Location
                                    </Text>
                                    <TextField.Root value={location} onChange={(e) => setLocation(e.target.value)}

                                        placeholder="Enter location"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Salary
                                    </Text>
                                    <TextField.Root value={salary} onChange={(e) => setSalary(e.target.value)}

                                        placeholder="Enter salary"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Job Category
                                    </Text>
                                    <TextField.Root value={job_category} onChange={(e) => setJobCategory(e.target.value)}

                                        placeholder="fulltime/parttime"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Job Type
                                    </Text>
                                    <TextField.Root value={job_type} onChange={(e) => setJobType(e.target.value)}

                                        placeholder="onsite/remote"
                                    />
                                </label>

                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button >Save</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
            </div>
        )
    } else return null;

}
