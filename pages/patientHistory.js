import React, { Component } from 'react'
import Sidebar from '../components/sidebar' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell, faUserDoctor, faAngleDown, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/header'
import HistoryTable from '../components/historyTable'
import styles from '../styles/PatientHistory.module.css'


function patientHistory() {
  return (
    <div className={styles.historyWrapper}> 
    
      <Sidebar/>
  
     
     <div className={styles.secondCont}>
     <Header/>

     <div className={styles.basicInfo}>  

      <div className={styles.pic}>
        <div className={styles.userIcon}>
        <FontAwesomeIcon icon={faCircleUser}/>
        </div>
        <h2> CJ Espino </h2> 
        <p>09123456789</p>
      </div>

      <div className={styles.patientInfo}>
          <ul> 
            <li type="none"> <b>Gender:</b> Male </li> 
            <li type="none"> <b>Birthdate:</b> October 3, 2000 </li> 
            <li type="none"> <b>Age:</b> 21 years old </li> 
            <li type="none"> <b>Blood Type:</b> O </li> 
            <li type="none"> <b>Medical History:</b> Asthma </li> 
            <li type="none"> <b>Address:</b> Iloilo City </li> 
            <li type="none"> <b>Allergies:</b></li> 
              <ul>
              <li>Dust</li>
              <li>Seafood</li>
              <li>Egg</li>
              </ul>
          </ul>  
      </div> 

      <div className={styles.parentsInfo}>
        <ul>
          <li> <b>Mothers Name:</b> Beng Espino</li>
          <li> <b>Occupation:</b> Businesswoman </li>
          <li> <b>Fathers Name:</b> Totong Espino </li>
          <li> <b>Occupation:</b> Businessman </li>
        </ul>
      </div>
     </div> 

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

export default patientHistory