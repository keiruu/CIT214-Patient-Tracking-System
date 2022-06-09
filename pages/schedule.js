import React from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import styles from '../styles/Dashboard.module.css';

export default function Schedule() {

    const EVENTS = [
        {
          event_id: 1,
          title: "Event 1",
          description: "Hatodg",
          start: new Date("2021 5 2 09:30"),
          end: new Date("2021 5 2 10:30"),
          backgroundColor: "#4146c3",
        },
      ];
      
  return (
    <div>
        <div className={styles.dashboardContainer}>
          <Sidebar/>
          <div className={styles.leftContainer}>
            <Header/>
            <div>
                <Scheduler
                    view="week"
                    events={EVENTS}
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
