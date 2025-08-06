
"use client"
import { Badge, Button, Card, Dialog, Flex, TextField } from '@radix-ui/themes'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from '@radix-ui/themes'
import { Application, Job, User } from '@/generated/prisma'
import { UserContext } from '@/app/(group)/layout'

export default function ViewApplicantsBtn({job} : {job : Job}) {
    const [applicants,setApplicants] = useState<(Application & {user : User})[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext)

    useEffect(()=>{
        async function getApplications(){
            setIsLoading(true);
            const res = await fetch(`/api/applicants/${job.id}`);
            const data = await res.json();

            console.log("kjagsdg",data);
            
            if(data.success){
                setApplicants(data.data)
                setIsLoading(false);
            }
        }
        getApplications();

    },[])

    if(user?.company.id != job.companyId) return null;

  return (
    <Dialog.Root>
	<Dialog.Trigger>
		<Button>View Applicants</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Applicants :</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			Current applicants..
		</Dialog.Description>

		<div>
            {
                isLoading ? <Spinner/> : ( (applicants.length == 0) ? <p>No applicants till now</p> : applicants.map(application => (
                    <Card key={application.id}>
                        <Badge>{application.user.email}</Badge>
                    </Card>
                )) )
              
            }
        </div>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Back
				</Button>
			</Dialog.Close>
			
		</Flex>
	</Dialog.Content>
</Dialog.Root>

  )
}
