import React, { Component } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Dashboard.module.css'
import PatientList from '../components/patientlist'

function Dashboard () {

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar/>
      <div className={styles.leftContainer}>
        <Header/>
        <div>
          <PatientList/>

        </div>
      </div>
    </div>
  )

}

export default Dashboard;