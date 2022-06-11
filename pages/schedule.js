import React, {useEffect, useState} from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import styles from '../styles/Dashboard.module.css';
import { useAuth } from '../src/authContext';

export default function Schedule() {
  const { patientData } = useAuth()
  const [events, setEvents] = useState([{}])
  let ev
  useEffect(() => {
    console.log("daPATIENAJKDHASKDHJSJta", patientData)
    if(patientData) {
      patientData.map((patient, index) => {
        console.log(patient)
        const dates = patient.date.split("-")
        console.log("AJSDHAJKSDHAS", dates)
        // console.log("AJSDHAJKSDHAS", index + 1) 
        const start = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${patient.visitationTime}`)
        const timeSplit = patient.visitationTime.split(":")
        const timeFirst = parseInt(timeSplit[0])
        const timeAdd = timeFirst === 12 ? 1 : timeFirst + 1
        console.log(`time ${timeAdd}:${timeSplit[1]}`)
        const end = new Date(`${dates[0]} ${dates[1]} ${dates[2]} ${timeAdd}:${timeSplit[1]}`)
        // setEvents([
        //   {
        //     event_id: index,
        //     title: patient.name,
        //     start: start,
        //     end: end,
        //   },
        // ])
        setEvents([
          {
            event_id: [...events.event_id, index],
            title: patient.name,
            start: start,
            end: end,
          },
        ])
        // ev.push({
        //   event_id: index,
        //   title: patient.name,
        //   start: start,
        //   end: end,
        // })
        console.log("Events ", events)
        }
      )
    }

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
