import React from 'react'
import styles from '../styles/Sidebar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartColumn, faCalendar, faMessage, faGear } from '@fortawesome/free-solid-svg-icons'

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

          <span>
            <Link href='/dashboard' passHref>
              <FontAwesomeIcon icon={faHouse} className={router.pathname == "/dashboard" ? styles.active : styles.inactive} size={size} />
            </Link>
          </span>

          <span>
            <Link href='/patients' passHref>
              <FontAwesomeIcon icon={faChartColumn} className={router.pathname == "/patients" ? styles.active : styles.inactive} size={size} />
            </Link>
          </span>

          <span>
            <Link href='/schedule' passHref>
              <FontAwesomeIcon icon={faCalendar} className={router.pathname == "/schedule" ? styles.active : styles.inactive} size={size} />
            </Link>
          </span>

          <span>
            <Link href='/messages' passHref>
              <FontAwesomeIcon icon={faMessage} className={router.pathname == "/messages" ? styles.active : styles.inactive} size={size} />
            </Link>
          </span>

        </div>
        <span>
          <Link href='/settings' passHref>
            <FontAwesomeIcon icon={faGear} className={styles.active} size={size}/>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Sidebar

