import React, {useEffect, useState} from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import styles from '../styles/Dashboard.module.css';
import { useAuth } from '../src/authContext';
import { getDocs, collection, getFirestore, query, where, doc, getDoc  } from 'firebase/firestore';

export default function Schedule() {
  const { patientData } = useAuth()
  const [events, setEvents] = useState([{}])
  let ev
  let eventArray = [{}]

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore()
      const q = query(collection(db, 'patientInfo'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      data.map(async (element)=>{
        const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
        const diagnosisDetails = await getDocs(diagnosisQ)
        const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
            ...doc.data(),
              id:doc.id
        }))
        if(diagnosisInfo.length > 0) {
          diagnosisInfo.map((patient, index) => {
            const datentime = patient.date.split("T")
            const dates = datentime[0].split("-")
            const time = datentime[1]
            console.log("time", time)
            const start = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${time}`)
            if(time) {
              const timeSplit = time.split(":")
              const timeFirst = parseInt(timeSplit[0])
              const timeAdd = timeFirst === 12 ? 1 : timeFirst + 1
              console.log(`time ${timeAdd}:${timeSplit[1]}`)
              const end = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${timeAdd}:${timeSplit[1]}`)
              eventArray.push({
                event_id: index,
                title: patient.name,
                start: start,
                end: end,
              })
            }
          }
          )
          // return diagnosisInfo
          console.log("INFO ", eventArray)
          setEvents(eventArray)
        } 
      })
    }

    const handleGet = async () => {
      await getData()
    }

    if(patientData) {
      let eventArray = [{}]
      patientData.map((patient, index) => {
        const datentime = patient.date.split("T")
        const dates = datentime[0].split("-")
        const time = datentime[1]
        const start = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${time}`)
        const timeSplit = time.split(":")
        const timeFirst = parseInt(timeSplit[0])
        const timeAdd = timeFirst === 12 ? 1 : timeFirst + 1
        console.log(`time ${timeAdd}:${timeSplit[1]}`)
        const end = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${timeAdd}:${timeSplit[1]}`)
        eventArray.push({
          event_id: index,
          title: patient.name,
          start: start,
          end: end,
        })
        
        setEvents(eventArray)
        }
      )
    }

    handleGet().catch(console.error)
  }, [patientData])
  

  return (
    <div>
        <div className={styles.dashboardContainer}>
          <Sidebar/>
          <div className={styles.leftContainer}>
            <Header/>
            <div>
                <Scheduler
                    view="week"
                    events={events}
                    fields={[
                      {
                        name: "Type",
                        type: "select",
                        // Should provide options with type:"select"
                        options: [
                          { id: 1, text: "Regular Checkup", value: 1 },
                          { id: 2, text: "Follow-up Checkup", value: 2 }
                        ],
                        config: { label: "Checkup Type", required: true, errMsg: "Please Select Checkup Type" }
                      }
                    ]}
                />
            </div>
          </div>
        </div>
    </div>
  )
}
