"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

function Admin() {

  // useEffect(() => {
  //   axios.get('/api/user')
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  // }, [])

  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email")?.toString() || "";
    if (email?.length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
     router.push("/sign-in");
    }
  }, []);

  return (
    <div>
      Hello
    </div>
  )
}

export default Admin
