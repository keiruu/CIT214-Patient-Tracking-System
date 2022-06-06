import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";
import { useState, useEffect } from "react"

export default function Signup() {
  const { currentUser, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signout = () => {
    logout()
    router.push('/login')
  }
  return (
    <div>
      <div>signup</div>
      <button onClick={() => {
                  signout()
              }}>logout</button>
    </div>
  )
}
