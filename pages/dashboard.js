import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Dashboard.module.css'
import PatientList from '../components/patientlist'
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";
import { getDocs, collection, getFirestore, query, where, doc, getDoc  } from 'firebase/firestore';
import ClockComp from '../components/clock'

function Dashboard () {
  const { currentUser, userName } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [doctor, setDoctor] = useState({firstName: "", lastName: ""})
  const [nPat, setNPat] = useState(0)
  const [followup, setFollowup] = useState(0)
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

  useEffect(() => {
    let eventArray = [{}]
    const getHistory = async () => {
      const db = getFirestore()
      const q = query(collection(db, 'patientInfo'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      data.map(async (element) => {
        const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
        const diagnosisDetails = await getDocs(diagnosisQ)
        const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
            ...doc.data(),
              id:doc.id
        }))

        if(diagnosisInfo.length > 0) {
          console.log("Eto lods", diagnosisInfo)
          diagnosisInfo.map((element) => {
            eventArray.push(element)
          })
          console.log("e", eventArray.length - 1)
          setNPat(eventArray.length - 1)
          return eventArray.length - 1
        }
      })
    }  

    const getFollowup = async () => {
      const db = getFirestore()
      const q = query(collection(db, 'patientInfo'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      data.map(async (element) => {
        const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`), where('followup', '==', true))
        const diagnosisDetails = await getDocs(diagnosisQ)
        const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
            ...doc.data(),
              id:doc.id
        }))

        if(diagnosisInfo.length > 0) {
          console.log("Eto lods", diagnosisInfo)
          diagnosisInfo.map((element) => {
            eventArray.push(element)
          })
          console.log("e", eventArray.length - 1)
          setFollowup(eventArray.length - 1)
          return eventArray.length - 1
        }
      })
    
    }  

    const handleGet = async () => {
      await getHistory()
      await getFollowup()
    }
  
    handleGet().catch(console.error)
  }, [])
  

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
                <h2>Good day, Dr. {doctor.firstName} {doctor.lastName} 👋</h2>
                <p>Start your day with a SMILE beacause HAPPINESS is the <br/> best MEDICINE!</p>
              </div>
              <div className={styles.flex}>
                <div className={styles.numbers}>
                  <div>
                    <p>No. of patients this month</p>
                    <p className={styles.num}>{nPat}</p>
                  </div>
                  <div>
                    <p>Patients for follow-up</p>
                    <p className={styles.num}>{followup}</p>
                  </div>
                </div>
                <div className={styles.time}>
                  <ClockComp/>
                </div>
              </div>
              {/* <PatientList/> */}
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default Dashboard;