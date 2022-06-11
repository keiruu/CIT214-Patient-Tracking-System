import Table from '../components/table'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Patients.module.css'
import { getDocs, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../src/firebase';
import { useEffect } from 'react';

export default function Patients() {
  /*const [PN, setNum] = useState('');*/
  const [patientinfo, setPatientinfo] = useState([]);
  /*const [Mname, setMname] = useState('');
  const [Lname, setLname] = useState('');
  const [Sex, setSex] = useState('');
  const [DoB, setDoB] = useState('');
  const [Add, setAdd] = useState('');
  const [Cont, setCont] = useState('');
  const [Gn, setGn] = useState('');
  const [GnCont, setGnCont] = useState('');
  const [Allergy, setAllergy] = useState('');*/

  useEffect(() => {
  getpatientInfo()
  },  [])

  useEffect(() => {
    console.log(patientinfo)
  }, [patientinfo])

  function getpatientInfo(){
    const patinfoCollectionRef = collection(db, 'patientInfo')
    getDocs(patinfoCollectionRef)
    .then(response => {
    const PatientInfo = response.docs.map(doc => ({
    data: doc.data(),
    id: doc.id,
  }))
    setPatientinfo(PatientInfo)
      
    })
    .catch(error => console.log(error.message))
  }
  return (
    <div className={styles.patientsContainer}>
      <Sidebar/>
      <div className={styles.leftContainer}>
        <Header/>
        <div className={styles.table}>
          {/* <ul>
            {patientinfo.map(
              PatInfo => 
              <li key={PatInfo.id}>
                {PatInfo.data.Fname}, {PatInfo.data.Mname}
              </li>   
            )}
          </ul> */}
          <Table/>
        </div>
      </div>
    </div>
  );
}