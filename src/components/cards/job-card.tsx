//@ts-nocheck
import { Card, Flex, Box, Text, Badge, Button , Avatar} from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link'
import { Bookmark } from 'lucide-react';


// type Job = {
//     job_id: string,
//     job_title: string,
//     employer_name: string,
//     employer_logo: string,
//     company: {
//         name: string,
//         address: string
//     }
// }




export default function JobCard({ item }) {
    return (

        
           <div className="m-[1em]  ">

            <Box maxWidth="30em" className="transition-transform duration-300 ease-in-out hover:scale-115" >
                <Card className="w-[25em] h-[25em]">
                    <Flex gap="3" align="center" className="flex flex-col p-4 ">
                        <Avatar
                            size="6"
                            src={item.employer_logo }
                            radius="full"
                            fallback={(item.employer_name)[0]}
                        />
                        <Text className=" text-center line-clamp-1">{item.job_title}</Text>
                        <Box>
                        <Text as="div" size="2" weight="bold">

                            {item.employer_name}
                        </Text>
                        </Box>
                        <Box>
                            <Text as="div" size="2" color="gray" className="line-clamp-8">
                                {item.job_description}
                            </Text>
                        </Box>
                        <Flex justify={"between"} gap={"5px"}>
                        <Link href={`products/`+ item.job_id}><Button className="m-[1em]">More details - </Button></Link>
                        <Button className="m-[1em]">Save Job </Button>
                        </Flex>
                    </Flex>
                </Card>

            </Box>
        </div>



        // <div className="flex flex-col h-[500px]">
        //     <Link href={`/products/${job.job_id}`}>
        //         <Box maxWidth="400px" maxHeight="500px" width={"500px"} >
        //             <Card>
        //                 <Flex gap="3" align="center">
        //                     <Avatar
        //                         size="3"
        //                         src={job.employer_logo}
        //                         radius="full"
        //                         fallback="T"
        //                     />
        //                     <Box>
        //                         <Text as="div" size="3" weight="bold">
        //                             {job.job_title}
        //                         </Text>
        //                         <Text as="div" size="2" color="gray">
        //                             {job.employer_name}
        //                         </Text>
        //                     </Box>
        //                 </Flex>
        //             </Card>
        //         </Box>
        //     </Link>
        // </div>

    )
}
