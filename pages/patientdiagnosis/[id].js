import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/header'
import HistoryTable from '../../components/historyTableDiagnosis'
import styles from '../../styles/PatientHistory.module.css'
import { useAuth } from '../../src/authContext'
import { useRouter } from 'next/router'
import { getDocs, collection, getFirestore, query, where, doc, getDoc  } from 'firebase/firestore';


export default function PatientHistory() {
  const {patient} = useAuth()
  const router = useRouter()
  const [patientInfo, setPatientInfo] = useState()
  const [patientHistory, setPatientHistory] = useState()
  const [ deets, setDeets ] = useState(false)
  const [ parentDoc, setParentDoc ] = useState()

  useEffect(() => {
    const route = router.asPath.split("/")
    const routeID = route[route.length-1]

    const getPatient = async (id) => {
        const db = getFirestore()
        const q = query(collection(db, 'patientInfo'), where ('id', '==', id))
        const docRef = doc(db, 'patientInfo', id);
        const snapshot = await getDoc(docRef)
    
        console.log("doc data ", snapshot.data())
        setPatientInfo(snapshot.data())
        return snapshot.data()
    }

    const getParentDoc = async (id) => {
        const db = getFirestore()
        const q = query(collection(db, 'patientInfo'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }))
        data.map(async (element)=>{
            const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
            const diagnosisDetails = await getDocs(diagnosisQ)
            const diagnosisInfo = diagnosisDetails.docs.map(async (doc)=>{
                console.log("ref path THIS" , doc.ref.path);
                console.log("ref parent" , doc.ref.parent.parent.id);
                const ref = doc.ref.path.split("/")
                const refPath = ref[ref.length - 1]
                if(refPath === routeID){
                    // router.push('/patient', doc.ref.parent.parent.id)
                    setParentDoc(doc.ref.parent.parent.id)
                    // setPatientInfo(await getPatient(doc.ref.parent.parent.id))
                    const sot = await getPatient(doc.ref.parent.parent.id).then(() => setDeets(true))
                    console.log(sot)
                }
            })
        })
    }

    const handleGet = async (routeID) => {
        await getParentDoc(routeID)
    }

    handleGet(routeID).catch(console.error)
  }, []) 
 
//   const handleGet = async (routeID) => {
//     setPatientInfo(await getParentDoc(routeID))
//     // setPatientHistory(await getPatientDiagnosisHistory(routeID))
//     console.log("INFO: ", patientInfo) 
//   }

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
              <p>Patient History</p>
          </div>
        </div>

        <div className={styles.histoTable}>
          <HistoryTable/>
        </div>
      </div>
    </div>
  )
}
