'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Save, Share } from 'lucide-react'

type Props = {
  selectedTab: any
}

const WorkspaceHeader = ({selectedTab}: Props) => {
  return (
    <>
      <div className='flex justify-between items-center p-3 border-b'>
        <div className='flex items-center gap-2'>
          <Image src={"/logo.svg"} alt={"logo icon"} width={40} height={40} />
          <h2>Workspace name</h2>
        </div>    
        {/*// switch*/}
        <Tabs defaultValue="overview" onValueChange={(value) => selectedTab(value)} >
          <TabsList>
            <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
            <TabsTrigger value="doc">Doc</TabsTrigger>
          </TabsList>
        </Tabs>
        {/*// extra buttons*/}
        <div>
          <Button><Save />Save</Button>
          <Button variant={'outline'}><Share />Share</Button>
          
        </div>
      </div>
    </>
  )
}

export default WorkspaceHeader