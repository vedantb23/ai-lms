"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/config/db';
import { USER_TABLE } from '@/config/schema';
import { eq } from "drizzle-orm";
const Provider = ({ children }) => {

   const { user } = useUser(); 
   const CheackIsNewUser=async () => {

       //if user already exist 
       const result=await db.select().from(USER_TABLE).where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress));
       console.log("result",result);
       if (result.length === 0) {
       //new user 
       const userResp= await db.insert(USER_TABLE).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
        }).returning({id:USER_TABLE.id}).then((res)=>{
            console.log("res",res);
        }).catch((err)=>{
            console.log("err",err);
        });
       }
   }
   useEffect(() => {
     CheackIsNewUser();
   }, [user])
   
  return <div>{children}</div>;
}

export default Provider;