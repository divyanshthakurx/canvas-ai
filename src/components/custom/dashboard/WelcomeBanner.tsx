'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { Sparkle } from 'lucide-react';
import React from 'react'

function WelcomeBanner() {

  const user = useUser();
  
  return (
    <>
      <div className='p-10 border rounded-xl bg-linear-to-r from-purple-200 to-blue-200'>
        <div className='text-3xl font-bold'>Welcome Back, {user?.user?.firstName}</div>
        <p>Bring your Ideas to life with infinite canvas</p>

        <div className='flex items-center gap-x-2 mt-5'>
          <Button size={"lg"}>+ Create new Board</Button>
          <Button size={"lg"} className={"bg-white"} variant={"outline"}><Sparkle />AI Assitant</Button>
        </div>
      </div>
    </>
  )
}

export default WelcomeBanner