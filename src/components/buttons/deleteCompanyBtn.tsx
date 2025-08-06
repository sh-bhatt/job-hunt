//@ts-nocheck
"use client"
import React from 'react'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '@/app/(group)/layout';

export default function DeleteCompanyBtn({companyId}) {
    const {user,setUser} = useContext(UserContext)
    const router = useRouter();
    async function handleDelete(){
        const res = await fetch(`/api/company/${companyId}`,{
            method : "DELETE"
        });
        
        
        const data = await res.json();

        console.log(data);
        

        if(data.success){
            alert(data.message);

           
            
            const updatedUser = JSON.parse(JSON.stringify(user));
            console.log(updatedUser);
            
            updatedUser.company = null;
            setUser(updatedUser)
            router.push("/")

            
        }
    }
  return (
    <Button onClick={handleDelete}>Delete your Company</Button>
  )
}
