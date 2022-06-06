import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Dashboard.module.css'
import PatientList from '../components/patientlist'
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";

function Dashboard () {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   setLoading(false)
  //   console.log("hey")
  //   if(!currentUser) {
  //     // setLoading(true)
  //     router.push('/login')
  //   }
  // }, [])


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
      </div> : currentUser &&
        <div className={styles.dashboardContainer}>
          <Sidebar/>
          <div className={styles.leftContainer}>
            <Header/>
            <div>
              <PatientList/>
    
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default Dashboard;