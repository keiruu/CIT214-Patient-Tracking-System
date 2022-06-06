import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/sidebar'
import Link from 'next/link'
//import hero from '../assets/hero.svg'
import hero from '../assets/heroPNG.png'
import { useRef, useState, useEffect } from "react"
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";

export default function Home() {
  const data = "im passing something"
  const emailRef = useRef()
  const passRef = useRef()
  const { login, signup, currentUser} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log(currentUser)
    try {
      setLoading(true)
      await login(emailRef.current.value, passRef.current.value)
      setLoading(false)
      console.log("Success")
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {loading ? <div className={styles.loader}>
        <BounceLoader color="#6C71F8" loading={loading} size={105} css={ 
          {
            margin: '0 auto',
            color: '#6C71F8',
          }
        } 
        /> 
      </div>
      :
      <div className={styles.loginContainer}>
        <div className={styles.left}>
          {/* <Sidebar data={data}/> */}
          <h1>TXJ Patient Tracking Login</h1>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <input ref={emailRef} type="email" name='email' id='email' placeholder='Email' required></input>
            <input ref={passRef} type="password" name='password' id='password' placeholder='Password' required></input>
            <p className={styles.forgot}>Forgot your password? <span className={styles.underlined}>Click here</span></p>
            <button className={styles.btnLogin} type="submit">LOGIN</button>
          </form>
          {/* <div className={styles.or}>
            <hr/> <span>OR</span> <hr/>
          </div> */}
          {/* <p>If you don&apos;t have an account. <Link>Sign up, now!</Link></p> */}
        </div>
        <div className={styles.hero}>
          <Image src={hero} alt="doctor inside a phone"></Image>
        </div>
      </div>
      }
    </div>
  )
}
