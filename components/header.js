import React, { Component, useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'

// Stuff you need for importing icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// The actual icon, find more here: 
// https://fontawesome.com/icons
// the website displays it as fa-magnifying-glass, remove the - and capitalize every first letter nalang
import { faMagnifyingGlass, faBell, faUserDoctor, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../src/authContext'
import Menu from '../components/menu'

function Header() {
  const { currentUser, userName } = useAuth()
  const [doctor, setDoctor] = useState({firstName: "", lastName: ""})
  // Change this according to how you would fetch the doctor's name from DB
  const size = "lg"
  
  useEffect(() => {
    let doctor
    const name = userName.split(" ")
    if(name.length >= 3) {
      setDoctor({firstName: name[0] + name[1], lastName: name[name.length - 1]})
    } else {
      setDoctor({firstName: name[0], lastName: name[1]})
    }
  }, [userName])
  
  return (
    <div className={styles.container}>
        <div className={styles.linedContainer}>
          <div className={styles.greeting}>
            <h2>Good day, Dr. {doctor.firstName} {doctor.lastName}</h2>
            <p>Start your day with a SMILE beacause HAPPINESS is the <br/> best MEDICINE!</p>
          </div>

          <div className={styles.end}>
            {/* <div className={styles.icon}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={size}/>
              <FontAwesomeIcon icon={faBell} size={size}/>
            </div> */}
            
            <div className={styles.profile}>
              {/* <FontAwesomeIcon icon={faUserDoctor} />
              <p>Dr. {doctor.firstName}</p>
              <FontAwesomeIcon icon={faAngleDown} className={styles.profileIcon} /> */}
              <Menu/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header
