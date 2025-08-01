import { Avatar, Heading, IconButton, TextField } from '@radix-ui/themes'
import React from 'react'
import { CircleUserRound } from 'lucide-react';
import { Link1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";


export default function Header() {
  return (
    <header className='sticky top-0 bg-blue-950 p-8 z-10 flex justify-between'>
        <div className='flex items-center gap-5'>
            
            <Avatar size={"3"} fallback={3} src={"none"}/>
        
            <Heading>JobMania</Heading>
        </div>

         <div>
            <form className="flex items-center" action={`/search`}>

                <TextField.Root placeholder="Search the docs…" name="q">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>

                <IconButton color="green">
                    <MagnifyingGlassIcon width="20" height="20" />
                </IconButton>
            </form>
        </div>


        <div>
            <CircleUserRound size={40} />
        </div>
        
    </header>
  )
}
