import React from 'react'
import styles from '../styles/PatientList.module.css'

export default function PatientList() {

  // Sample data, change according to how you would get data from DB
  const patientData = [
    {id: 1, firstName: 'Zenrick', lastName: 'Parcon', visit: 'Regular Visit', appointment: 'On going'},
    {id: 2, firstName: 'Thrys', lastName: 'Formoso', visit: 'Regular Visit', appointment: '9:00 A.M'},
    {id: 3, firstName: 'Abigail Kaye', lastName: 'Unating', visit: 'Regular Visit', appointment: '10:00 A.M'},
  ];

  return (
    <div>
      <div className={styles.list}>
        <h2>Patient List</h2>
        {patientData.map((patient) => 
          <div key={patient.id} className={styles.patient}> 
            <div className={styles.patientDetails}>
              <b>{patient.firstName} {patient.lastName}</b>
              <span>{patient.visit}</span>
            </div>
            <div className={styles.patientAppointment}>
              {patient.appointment}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}