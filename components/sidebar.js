import React from 'react'
import styles from '../styles/Sidebar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserClock, faCalendar, faUsers, faNotesMedical, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/icon.svg'

import { useRouter } from "next/router";
import { useEffect } from 'react/cjs/react.development'

const active = "#6C71F8"
const inactive = "#C1C7D0"
const size = "xl"


function Sidebar() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.sidebarContainer}>
        <div className={styles.mainIcons}>

          <div className={styles.logo}>
            <Link href="/dashboard" passHref>
            <Image src={logo} alt="Logo"/>
            </Link>
          </div>

          <div className={styles.menuOptions}>
            <span>
              <Link href='/dashboard' passHref>
                <div className={router.pathname == "/dashboard" ? styles.active : styles.inactive}>
                  <FontAwesomeIcon icon={faHouse} size={size} />
                  <span>Dashboard</span>
                </div>
              </Link>
            </span>

            <span>
              <Link href='/patients' passHref>
                <div className={router.pathname == "/patients" ? styles.active : styles.inactive}>
                <FontAwesomeIcon icon={faUsers} size={size} />
                <span>Patient List</span>
                </div>
              </Link>
            </span>

            {/* <span>
              <Link href='/patientsHistory' passHref>
                <div className={router.pathname == "/patientsHistory" ? styles.active : styles.inactive}>
                <FontAwesomeIcon icon={faUserClock} size={size} />
                <span>Patient History</span>
                </div>
              </Link>
            </span> */}


            <span>
              <Link href='/followup' passHref>
                <div className={router.pathname == "/followup" ? styles.active : styles.inactive}>
                  <FontAwesomeIcon icon={faNotesMedical} size={size} />
                  <span>Follow-up Checkup</span>
                </div>
              </Link>
            </span>

            <span>
              <Link href='/schedule' passHref>
                <div className={router.pathname == "/schedule" ? styles.active : styles.inactive}>
                  <FontAwesomeIcon icon={faCalendar} size={size} />
                  <span>Schedule</span>
                </div>
              </Link>
            </span>
          </div>

        </div>
        {/* insert pdf */}
        <div className={styles.userManual}>
          <FontAwesomeIcon icon={faCircleInfo} size={size}/>
          <span>User Manual</span>
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar

