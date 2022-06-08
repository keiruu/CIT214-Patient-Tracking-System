import Image from 'next/image'
import styles from '../styles/Home.module.css'
import hero from '../assets/heroPNG.png'
import { useRef, useState, useEffect } from "react"
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";

export default function Home() {
  const data = "im passing something"
  const emailRef = useRef()
  const passRef = useRef()
  const { login, currentUser, userUID} = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      //setLoading(true)
      await login(emailRef.current.value, passRef.current.value)
      //setLoading(false)

    } catch (error) {
      console.log(error)
    }

    //setLoading(true)
    return router.push('/dashboard')
  }

  const handleUID = (uid) => {
    try {
      if(uid == "3l4tNaUj23Wzz8SW34vxoDwjtv83") {
        router.push('/signup')
      } else {
        console.log("ari ta di")
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    console.log(userUID)
    if (userUID) {
      handleUID(userUID)
    }
  }, [userUID])

  return (
    <div>
     {loading ? 
      <div className={styles.loader}>
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
