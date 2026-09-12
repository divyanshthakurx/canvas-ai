'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react'

function ProjectList() {

  const [projectList, setProjectList] = useState([]);
  
  return (
    <div>{projectList.length === 0 ? (
      // {/*Empty project List*/}
      <div className='flex flex-col justify-center items-center gap-y-3 border rounded-xl p-10 mt-10'>
        <Image src={"/folder.svg"} alt={"Folder Icon"} width={100} height={100} />
        <div className='text-2xl font-bold'>No Boards Found</div>
        <p className='text-muted-foreground'>Create your first board to start brainstorming & planning !</p>
        <Button size={"lg"} >+ Create new canvas</Button>
      </div>
        
    ) : // {/*set project list*/}
      <div>
              
      </div>
      }
    </div>
  )
}

export default ProjectList