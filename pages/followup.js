import Table from '../components/tableFollowup'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Patients.module.css'
import { getDocs, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../src/firebase';
import { useEffect } from 'react';


export default function Followup() {
    const [patientinfo, setPatientinfo] = useState([]);
    
    return (
      <div className={styles.patientsContainer}>
        <Sidebar/>
        <div className={styles.leftContainer}>
          <Header/>
          <div className={styles.table}>
            <Table/>
          </div>
      </div>
    </div>
    )
   }