import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";
import { useState, useEffect } from "react"
import styles from '../styles/Home.module.css'

export default function Home() {
  const { currentUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(currentUser) {
      setLoading(true)
      router.push('/dashboard')
    } else {
      setLoading(true)
      router.push('/login')
    }
  }, [])

  return (
    <div>
      {loading &&
        <div className={styles.loader}>
          <BounceLoader color="#6C71F8" loading={loading} size={105} css={ 
            {
              margin: '0 auto',
              color: '#6C71F8',
            }
          } 
          />
        </div>
      }
    </div>
  )
}
