"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '../config/db';
import { USER_TABLE } from '../config/schema';
import { eq } from "drizzle-orm";
import axios from 'axios';
const Provider = ({ children }) => {

   const { user } = useUser(); 
//    console.log("Clerk user:", user);
   const CheackIsNewUser = async () => {
     const resp = await axios.post('/api/create-user', { user: user });
      console.log("Response from create-user API:", resp.data);
   };
   useEffect(() => {
     CheackIsNewUser();
   }, [user])
   
  return <div>{children}</div>;
}

export default Provider;