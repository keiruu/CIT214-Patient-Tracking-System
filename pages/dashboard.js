import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Dashboard.module.css'
import PatientList from '../components/patientlist'
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";

function Dashboard () {
  const { currentUser, userName } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [doctor, setDoctor] = useState({firstName: "", lastName: ""})

   useEffect(() => {
    if(!currentUser) {
      // setLoading(true)
      router.push('/login')
    }
  }, [])

  // Change this according to how you would fetch the doctor's name from DB
  const size = "lg"
  
  useEffect(() => {
    let doctor
    const name = userName.split(" ")
    if(name.length >= 3) {
      setDoctor({firstName: name[0] + name[1], lastName: name[name.length - 1]})
    } else {
      setDoctor({firstName: name[0], lastName: name[1]})
    }
  }, [userName])
  

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
              <div className={styles.head}>
              <h2>Good day, Dr. {doctor.firstName} {doctor.lastName}</h2>
              <p>Start your day with a SMILE beacause HAPPINESS is the <br/> best MEDICINE!</p>
              </div>
              <PatientList/>
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default Dashboard;