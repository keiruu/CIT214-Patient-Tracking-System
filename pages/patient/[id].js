import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/header'
import HistoryTable from '../../components/historyTable'
import styles from '../../styles/PatientHistory.module.css'
import { useAuth } from '../../src/authContext'
import { useRouter } from 'next/router'


export default function PatientData() {
  const {getPatient, patient} = useAuth()
  const router = useRouter()
  const [patientInfo, setPatientInfo] = useState()
  const [ deets, setDeets ] = useState(false)
    
  useEffect(() => {
    const route = router.asPath.split("/")
    const routeID = route[route.length-1]
    console.log("routeID ", routeID)
    handleGet(routeID).then(() => setDeets(true))
  }, [])
 
  const handleGet = async (routeID) => {
    setPatientInfo(await getPatient(routeID))
    console.log("INFO: ", patientInfo) 
  }

  return (
    <div className={styles.historyWrapper}> 
      <Sidebar/>
     
     <div className={styles.secondCont}>
        <Header/>

        {deets && <div className={styles.basicInfo}>  
          <div className={styles.pic}>
            <div className={styles.userIcon}>
            <FontAwesomeIcon icon={faCircleUser}/>
            </div>
            <h2> {patientInfo.Fname + " " + patientInfo.Lname} </h2> 
            <p>{patientInfo.Cont}</p>
          </div>

          <div className={styles.patientInfo}>
              <ul> 
                <li type="none"> <b>Sex:</b> {patientInfo.Sex} </li> 
                <li type="none"> <b>Birthdate:</b> {patientInfo.DoB} </li> 
                <li type="none"> <b>Age:</b> {patientInfo.DoB} </li>
                <li type="none"> <b>Address:</b> {patientInfo.Add} </li> 
                <li type="none"> <b>Allergies:</b> {patientInfo.Allergy}</li> 
                  
              </ul>   
          </div> 

          <div className={styles.parentsInfo}>
            <ul>
              <li> <b>Guardian Name: </b> {patientInfo.Gn}</li>
              <li> <b>Guardian Contact Number:</b> {patientInfo.GnCont} </li>
            </ul>
          </div>
        </div> 
        }
        <div className={styles.titleB}>
          <div className={styles.titleC}> 
              <h3>Patient History</h3>
          </div>
        </div>

        <div className={styles.histoTable}>
          <HistoryTable/>
        </div>
      </div>
    </div>
  )
}
