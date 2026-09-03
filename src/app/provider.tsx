'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userDetailContext } from '@/context/userDetailContext';

function Provider({children}: {children: React.ReactNode}) {

  const [userDetail, setUserDetail] = useState<any>();

  const createNewUser = async () => {
    const response = await axios.post("/api/users");
    console.log(response.data);  
    setUserDetail(response.data)
  }
  
  useEffect(() => {
    try {
      createNewUser();
    } catch (error) {
      console.log('error is', error);
    }
  }, [])

  return (
    // here we pass default value so after passing the value later it is available to all childrens
    <userDetailContext.Provider value={{userDetail, setUserDetail}}> 
    <div>
      {children}
    </div>
    </userDetailContext.Provider>
  )
}

export default Provider;