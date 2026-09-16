'use client'

import SmartDocument from '@/components/custom/workspace/SmartDocument';
import Whiteboard from '@/components/custom/workspace/Whiteboard';
import WorkspaceHeader from '@/components/custom/workspace/WorkspaceHeader'
import React, { useState } from 'react'

const Workspace = () => {

  const [activeTab, setActiveTab] = useState('whiteboard');
  
  return (
    <>
      <WorkspaceHeader selectedTab={(value: string) => setActiveTab(value)} /> 
      {activeTab === 'whiteboard' ?
        <Whiteboard /> :
        <SmartDocument />
      }
    </>
  )
}

export default Workspace
