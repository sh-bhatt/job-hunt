//@ts-nocheck
"use client"
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "@/app/(group)/layout"

export default function AddCompany(){
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const {user,setUser} = useContext(UserContext);

    async function handleSave(){
        const companyObj = {
            name,
            description
        }
        const res = await fetch("/api/company",{
            method : "POST",
            body : JSON.stringify(companyObj)
        })

        const data = await res.json();
        if(data.success){
            alert("Company created successfully");
            const updatedUser = {...user};
            updatedUser.company = data.data;
            console.log("ini",updatedUser);
            setUser(updatedUser);
            console.log("up",user);
            
        }
    }
    return(
        <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Comapny</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Company</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill the details to create a new company
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root value={name} onChange={(e) => setName(e.target.value)}
                
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
            
            
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    )
}
