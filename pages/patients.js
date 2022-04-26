import PatientTable from '../components/patientTable'
import Table from '../components/table'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Patients.module.css'
import React from 'react'
 
export default function Patients() {

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