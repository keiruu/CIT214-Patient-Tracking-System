import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/sidebar'
import Link from 'next/link'
//import hero from '../assets/hero.svg'
import hero from '../assets/heroPNG.png'
import { useRef } from "react"
import { useAuth } from "../src/context"

export default function Home() {
  const data = "im passing something"
  const emailRef = useRef()
  const passRef = useRef()
  const { signup } = useAuth

  function handleSubmit(e) {
    e.preventDefault()

    signup(emailRef.current.value, passRef.current.value)
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.left}>
        {/* <Sidebar data={data}/> */}
        {/* <h1>Sample Text</h1>
        <Link href="/login">login</Link> */}
        <h1>TXJ Patient Tracking Login</h1>
        <form action='' method='GET' className={styles.loginForm}>
          <input ref={emailRef} type="email" name='email' id='email' placeholder='Email' required></input>
          <input ref={passRef} type="password" name='password' id='password' placeholder='Password' required></input>
        </form>
        <p className={styles.forgot}>Forgot your password? <span className={styles.underlined}>Click here</span></p>
        <button className={styles.btnLogin}>LOGIN</button>
        {/* <div className={styles.or}>
          <hr/> <span>OR</span> <hr/>
        </div> */}
        {/* <p>If you don&apos;t have an account. <Link>Sign up, now!</Link></p> */}
      </div>
      <div className={styles.hero}>
        <Image src={hero} alt="doctor inside a phone"></Image>
      </div>
    </div>
  )
}
