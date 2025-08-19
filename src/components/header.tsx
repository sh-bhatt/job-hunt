//@ts-nocheck
'use client';
import { Avatar, Heading, IconButton, TextField, Button } from '@radix-ui/themes';
import React, { useEffect, useState, useContext } from 'react';
import { CircleUserRound } from 'lucide-react';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { UserContext } from '@/app/(group)/layout';
import AddCompany from './addCompany';
import Link from 'next/link';
import AddJobBtn from './buttons/addJobBtn';
import LogoutBtn from './buttons/logout-btn';

export default function Header() {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function getSuggestions() {
      const res = await fetch("api/search/suggestion?q=" + input);
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestions);
      }
    }
    let x;
    if (input) {
      x = setTimeout(() => {
        getSuggestions();
      }, 1000);
    } else {
      setSuggestions([]);
    }
    return () => clearTimeout(x);
  }, [input]);

  return (
    <header className="sticky top-0 bg-black text-white p-6 z-10 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
       <Link href={"/"}> <Heading size="5" className="text-white font-bold content-center">Job Hunt</Heading></Link>
      </div>

      <div className="flex gap-6 items-center">
        {/* Search Box */}
        <div className="relative">
          <form className="flex items-center" action={`/search`}>
            <TextField.Root
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search jobs..."
              name="q"
              autoComplete="off"
              className="bg-black text-white border border-white"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" color="white" />
              </TextField.Slot>
            </TextField.Root>

            <IconButton color="gray" className="ml-2 border border-white text-white hover:bg-white hover:text-black transition">
              <MagnifyingGlassIcon width="20" height="20" />
            </IconButton>
          </form>

          {suggestions.length > 0 && (
            <div className="absolute top-10 rounded px-2 py-1 w-full bg-gray-800 shadow-lg text-white flex flex-col gap-1 z-20">
              {suggestions.map((elem) => (
                <p key={elem.id} className="truncate hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                  {elem.title}
                </p>
              ))}
            </div>
          )}
        </div>

        
        {!user?.company ? <AddCompany /> : <AddJobBtn />}

       
        {user?.company && (
          <Link href={`/company/${user.company.id}`}>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition">
              View Your Company
            </Button>
          </Link>
        )}

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 text-white text-sm">
          <CircleUserRound size={36} />
          <span>{user?.email}</span>
        </div>
        <Link href='/applied-jobs'>Your job applications</Link>

        {/* Logout */}
        <LogoutBtn />
      </div>
    </header>
  );
}
